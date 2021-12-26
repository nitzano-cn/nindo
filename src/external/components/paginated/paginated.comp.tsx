import React, { ReactChild, ReactElement, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { ILocalState, IPaginationResponse, IHttpResult, IPaginationQueryParams } from '../../types/http.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { HttpService } from '../../services';
import { Button } from '../button/button.comp';
import { Loader } from '../loader/loader.comp';

import './paginated.scss';

const httpService = new HttpService();

type PaginatedProps = {
  endpoint: string
  itemsRenderer: (items: any[], page: number, pages: number, total: number) => ReactChild | ReactElement | JSX.Element[] | JSX.Element | string
  loaderRenderer?: ReactChild | ReactElement | JSX.Element[] | JSX.Element | string
  paginationRenderer?: (paginationState: IPaginationResponse, queryParams: IPaginationQueryParams, setQueryParams: (params: IPaginationQueryParams) => void) => ReactChild | ReactElement | JSX.Element[] | JSX.Element | string
  errorRenderer?: (message: string) => ReactChild | ReactElement | JSX.Element[] | JSX.Element | string
  emptyRenderer?: ReactChild | ReactElement | JSX.Element[] | JSX.Element | string
  hooks?: {
    preFetch?: () => void
    postFetch?: () => void
  }
  paginationPosition?: 'top' | 'bottom' | 'both'
  wrapperClassName?: string
  limit?: number
  extraQueryParams?: string
}

export const Paginated = forwardRef((props: PaginatedProps, ref: any)=> {
  const { limit = 10, endpoint, extraQueryParams, wrapperClassName, itemsRenderer, loaderRenderer, paginationRenderer, errorRenderer, emptyRenderer, hooks, paginationPosition = 'bottom' } = props;
  const [localState, setLocalState] = useState<ILocalState>({ state: 'init', message: null });
  const [paginationState, setPaginationState] = useState<IPaginationResponse>({ limit, docs: [], page: 1, pages: 0, total: 0 });
  const [queryParams, setQueryParams] = useState<IPaginationQueryParams>({
    limit,
    page: 1,
    sortBy: '',
    desc: false,
    q: ''
  });

  async function getItems(refresh = false) {
    if (refresh) {
      setQueryParams({ page: 1, limit, q: '', desc: false, sortBy: queryParams.sortBy });
      return;
    }

    if (hooks && hooks.preFetch) {
      hooks.preFetch();
    }

    setLocalState({ ...localState, state: 'loading' });

    try {
      const { limit, page, q, sortBy } = queryParams;
      const result: IHttpResult = await httpService.makeRequest(`${endpoint}?limit=${limit}&page=${page}&q=${q}&sortBy=${sortBy}${refresh ? '&refresh=true' : ''}${extraQueryParams ? '&' + extraQueryParams : ''}`);
      
      if (!result.success) {
        throw new Error(result.message || 'Could not load items.');
      }

      setLocalState({
        ...localState,
        state: 'success',
      });

      const data: IPaginationResponse = result.data as IPaginationResponse;
      setPaginationState(data);

      if (hooks && hooks.postFetch) {
        hooks.postFetch();
      }
    } catch (e) {
      setLocalState({ 
        state: 'error', 
        message: (e as Error).message || 'Could not load items' 
      });
    }
  }

  function setItems(items: any[] = []) {
    setPaginationState({
      ...paginationState,
      docs: [...items]
    });
  }

  function renderPagination() {
    if (localState.state !== 'success') {
      return <></>;
    }

    return (
      paginationState.total > 0 &&
      (
        paginationRenderer ?
        paginationRenderer(paginationState, queryParams, setQueryParams) :
        <div className="pagination">
          <Button color="transparent" size="small" disabled={queryParams.page <= 1} onClick={() => setQueryParams({ ...queryParams, page: queryParams.page - 1 })}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <span>Page {queryParams.page}/{paginationState.pages}</span>
          <Button color="transparent" size="small" disabled={queryParams.page >= paginationState.pages} onClick={() => setQueryParams({ ...queryParams, page: queryParams.page + 1 })}>
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      )
    );
  }

  function renderContent() {
    if (localState.state === 'init') {
      return <React.Fragment />;
    }

    if (localState.state === 'loading') {
      if (loaderRenderer) {
        return loaderRenderer;
      }
      return <Loader><p>Loading...</p></Loader>;
    }

    if (localState.state === 'error') {
      if (errorRenderer) {
        return errorRenderer(localState.message || 'Error');
      }
      return <p className="center error">{localState.message}</p>;
    }

    if (paginationState.total === 0) {
      if (emptyRenderer) {
        return emptyRenderer;
      }
      return <p className="center error">No items found.</p>;
    }

    return itemsRenderer(paginationState.docs, paginationState.page, paginationState.pages, paginationState.total);
  }

  useEffect(() => {
    getItems(true);
  }, []);

  useEffect(() => {
    getItems();
  }, [queryParams]);

  useImperativeHandle(ref, () => ({ getItems, setItems, setQueryParams }));

  return (
    <div className={`paginated-wrapper ${wrapperClassName || ''}`}>
      {
        (paginationPosition === 'both' || paginationPosition === 'top') &&
        renderPagination()
      }
      {renderContent()}
      {
        (paginationPosition === 'both' || paginationPosition === 'bottom') &&
        renderPagination()
      }
    </div>
  );
});