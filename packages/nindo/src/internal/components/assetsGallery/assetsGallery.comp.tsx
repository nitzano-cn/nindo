import React, {
	useState,
	useRef,
	forwardRef,
	useImperativeHandle,
	useEffect,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faDesktop,
	faFile,
	faFilePdf,
	faFileVideo,
	faFileAudio,
	faFileImage,
	faFileCsv,
	faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../../external/components/button/button.comp';
import { FileUpload } from '../../../external/components/fileUpload/fileUpload.comp';
import { ConfirmationPopup } from '../../../external/components/confirmationPopup/confirmationPopup.comp';
import { Paginated } from '../../../external/components/paginated/paginated.comp';
import {
	IAsset,
	AssetType,
	IUnsplashImage,
	IAssetFigure,
} from '../../../external/types/asset.types';
import { SystemIcon } from '../../../external/components/icon/icon.comp';
import { assetService } from '../../services/asset.service';
import { unsplashService } from '../../services/unsplash.service';

import './assetsGallery.scss';

interface AssetsGalleryProps {
	postUploadCallback: (url: string, name: string, guid: string) => void;
	uploadStartCallback: () => void;
	uploadErrorCallback: (message: string) => void;
	submitCallback: (url: string) => void;
	uploadIsAvailable: boolean;
	uploadDisabledCallback?: () => void;
	limit?: number;
	assetApiBaseUrl?: string;
	assetApiQueryParams?: string;
	assetType?: AssetType;
	fileSizeLimitInMB?: number;
}

interface MyUploadsProps {
	onSelect: (asset: IAsset | null) => void;
	selectedAsset: IAsset | null;
	limit?: number;
}

const SearchInput = ({
	value,
	onSubmit,
	onChange,
	placeholder,
}: {
	value: string;
	onChange: (q: string) => void;
	onSubmit: () => void;
	placeholder?: string;
}) => {
	return (
		<div className="search-wrapper">
			<input
				type="text"
				placeholder={placeholder || 'Search...'}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => {
					if (e.keyCode === 13 || e.key === 'Enter') {
						onSubmit();
					}
				}}
			/>
			{value.length > 0 && (
				<span
					onClick={() => {
						onChange('');
					}}
				>
					<SystemIcon type="close" />
				</span>
			)}
		</div>
	);
};

interface ILinkUploadProps {
	onSelect: (asset: IAsset | null) => void;
	assetType: AssetType;
}

const LinkUpload = (props: ILinkUploadProps) => {
	const { onSelect, assetType } = props;
	const [value, setValue] = useState('');
	const [error, setError] = useState('');

	function isValidHttpUrl(str: string) {
		let url;

		try {
			url = new URL(str);
		} catch (_) {
			return false;
		}

		return url.protocol === 'http:' || url.protocol === 'https:';
	}

	function selectAsset(asset: IAsset) {
		const isValid = isValidHttpUrl(asset.url);
		setError(asset.url && isValid ? '' : 'Please enter a valid URL');

		if (isValid) {
			onSelect(asset);
		} else {
			onSelect(null);
		}
	}

	return (
		<div className="my-uploads">
			<header>
				<h4>Upload from link</h4>
			</header>
			<div className="link-upload">
				<div className="link-upload-input-wrapper center">
					<p>Paste the URL of the asset you want to use</p>
					<SearchInput
						value={value}
						onChange={(q) => {
							setValue(q);
							selectAsset({
								url: q,
								guid: '',
								assetType,
								name: 'link',
								serviceName: '',
								userId: '',
							});
						}}
						onSubmit={() => {
							selectAsset({
								guid: '',
								assetType,
								url: value,
								name: 'link',
								serviceName: '',
								userId: '',
							});
						}}
						placeholder="Paste link here..."
					/>
					{error && <p className="error">{error}</p>}
				</div>
			</div>
		</div>
	);
};

const AssetFigure = ({
	asset,
	selectedAsset,
	selectAsset,
	enableEditMode,
}: {
	asset: IAssetFigure;
	selectedAsset: IAsset | null;
	selectAsset: (asset: IAsset) => void;
	enableEditMode?: boolean;
}) => {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [localAssetName, setLocalAssetName] = useState<string>(asset.name);
	const inputRef = useRef() as any;

	function localSelectAsset() {
		submitNameChange();
		selectAsset(asset);
	}

	function renderAssetIcon(assetType: AssetType) {
		let icon = faFile;
		switch (assetType) {
			case AssetType.IMAGE:
				icon = faFileImage;
				break;
			case AssetType.PDF:
				icon = faFilePdf;
				break;
			case AssetType.VIDEO:
				icon = faFileVideo;
				break;
			case AssetType.CSV:
				icon = faFileCsv;
				break;
			case AssetType.AUDIO:
				icon = faFileAudio;
				break;
			case AssetType.ALL:
				icon = faFile;
				break;
		}
		return <FontAwesomeIcon icon={icon} />;
	}

	function toggleEditMode(e: any) {
		e.stopPropagation();
		setEditMode(!editMode);
	}

	function submitNameChange() {
		if (localAssetName !== asset.name) {
			assetService.update(asset.guid as string, localAssetName);
		}
		setEditMode(false);
	}

	function renderEditSection() {
		if (editMode) {
			return (
				<input
					ref={inputRef}
					type="text"
					value={localAssetName}
					onChange={(e) => {
						setLocalAssetName(e.target.value);
					}}
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						if (e.keyCode === 13 || e.key === 'Enter') {
							submitNameChange();
						}
					}}
				/>
			);
		}

		return (
			<FontAwesomeIcon
				icon={faEdit}
				title="Click to edit"
				onClick={toggleEditMode}
			/>
		);
	}

	function renderFigCaption() {
		if (editMode) {
			return <></>;
		}

		if (asset.author?.name) {
			return (
				<a
					href={asset.author.url}
					target="_blank"
					onClick={(e) => e.stopPropagation()}
				>
					{asset.author.name}
				</a>
			);
		}

		return localAssetName;
	}

	useEffect(() => {
		if (editMode) {
			inputRef.current?.focus();
			inputRef.current?.select();
		}
	}, [editMode]);

	return (
		<article
			className={`asset ${asset.assetType} ${
				selectedAsset && asset.guid === selectedAsset.guid ? 'selected' : ''
			}`}
			onClick={() => localSelectAsset()}
		>
			<figure>
				{asset.assetType === AssetType.IMAGE && asset.url ? (
					<img src={asset.url} alt={localAssetName} title={localAssetName} />
				) : (
					<div className="asset-icon">{renderAssetIcon(asset.assetType)}</div>
				)}
				<figcaption
					className={editMode ? 'edit-mode' : ''}
					title={localAssetName}
				>
					{renderFigCaption()}
					{enableEditMode && renderEditSection()}
				</figcaption>
			</figure>
			<FontAwesomeIcon className="selected-check" icon={faCheck} />
		</article>
	);
};

const UnsplashGallery = (props: MyUploadsProps) => {
	const { limit, onSelect, selectedAsset } = props;
	const [query, setQuery] = useState<string>('');
	const paginatedCompRef: any = useRef();

	function selectAsset(asset: IAsset) {
		if (selectedAsset && selectedAsset.guid === asset.guid) {
			onSelect(null);
		} else {
			onSelect(asset);
		}
	}

	return (
		<div className="my-uploads unsplash">
			<header>
				<h4>
					Discover Images by{' '}
					<a
						href="https://unsplash.com/?utm_source=Common Ninja&utm_medium=referral"
						target="_blank"
					>
						Unsplash
					</a>
				</h4>
				<SearchInput
					value={query}
					onChange={(q) => setQuery(q)}
					onSubmit={() => {
						if (paginatedCompRef) {
							paginatedCompRef.current.getItems(true);
						}
					}}
				/>
			</header>
			<Paginated
				ref={paginatedCompRef}
				endpoint={`${assetService.baseApiUrl}/asset/unsplash`}
				extraQueryParams={`${assetService.queryParams}&q=${
					query || 'computer'
				}`}
				limit={limit}
				itemsRenderer={(assets: IUnsplashImage[]) => (
					<div className="items-wrapper">
						{assets
							.map(
								(asset: IUnsplashImage): IAssetFigure => ({
									guid: asset.guid,
									assetType: AssetType.IMAGE,
									name: asset.description,
									url: asset.url,
									downloadUrl: asset.downloadUrl,
									userId: '',
									serviceName: '',
									thumbnail: asset.thumbnail,
									author: asset.author,
								})
							)
							.map((asset) => (
								<AssetFigure
									asset={asset}
									key={`asset_${asset.guid}`}
									selectAsset={selectAsset}
									selectedAsset={selectedAsset}
								/>
							))}
					</div>
				)}
				errorRenderer={(error: string) => (
					<div className="items-wrapper with-error">
						<p className="center error">{error}</p>
					</div>
				)}
				emptyRenderer={
					<div className="items-wrapper with-error">
						<p className="center error">Could not find images.</p>
					</div>
				}
			/>
		</div>
	);
};

const MyUploads = forwardRef((props: MyUploadsProps, ref: any) => {
	const { limit, onSelect, selectedAsset } = props;
	const [query, setQuery] = useState<string>('');
	const paginatedCompRef: any = useRef();

	function selectAsset(asset: IAsset) {
		if (selectedAsset && selectedAsset.guid === asset.guid) {
			onSelect(null);
		} else {
			onSelect(asset);
		}
	}

	useImperativeHandle(ref, () => ({
		reloadItems() {
			if (paginatedCompRef) {
				paginatedCompRef.current.getItems();
			}
		},
	}));

	return (
		<div className="my-uploads">
			<header>
				<h4>My Files</h4>
				<SearchInput
					value={query}
					onChange={(q) => setQuery(q)}
					onSubmit={() => {
						if (paginatedCompRef) {
							paginatedCompRef.current.getItems(true);
						}
					}}
				/>
			</header>
			<Paginated
				ref={paginatedCompRef}
				endpoint={`${assetService.baseApiUrl}/asset`}
				extraQueryParams={`${assetService.queryParams}&q=${query}`}
				limit={limit}
				itemsRenderer={(assets: IAsset[]) => (
					<div className="items-wrapper">
						{assets.map((asset) => (
							<AssetFigure
								asset={asset}
								key={`asset_${asset.guid}`}
								selectAsset={selectAsset}
								selectedAsset={selectedAsset}
								enableEditMode={true}
							/>
						))}
					</div>
				)}
				errorRenderer={(error: string) => (
					<div className="items-wrapper with-error">
						<p className="center error">{error}</p>
					</div>
				)}
				emptyRenderer={
					<div className="items-wrapper with-error">
						<p className="center error">No assets found.</p>
					</div>
				}
			/>
		</div>
	);
});

export const AssetsGallery = (props: AssetsGalleryProps) => {
	const {
		submitCallback,
		assetType = AssetType.IMAGE,
		uploadErrorCallback,
		uploadStartCallback,
		uploadIsAvailable,
		fileSizeLimitInMB,
		uploadDisabledCallback,
		postUploadCallback,
		assetApiBaseUrl,
		assetApiQueryParams,
	} = props;
	const [selectedAsset, setSelectedAsset] = useState<IAsset | null>(null);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<'uploads' | 'link' | 'unsplash'>(
		'uploads'
	);
	const childRef = useRef() as any;

	if (assetApiBaseUrl) {
		assetService.baseApiUrl = assetApiBaseUrl;
	}

	if (assetApiQueryParams) {
		assetService.queryParams = assetApiQueryParams;
	}

	function postUpload(
		url: string,
		name: string,
		guid: string,
		type: AssetType
	) {
		// Reload list
		if (childRef?.current) {
			childRef.current.reloadItems();
		}

		// Set active asset
		setSelectedAsset({
			guid,
			name,
			url,
			assetType: type,
			userId: '',
			serviceName: '',
		});

		setActiveTab('uploads');

		// Callback from creator
		postUploadCallback(url, name, guid);
	}

	async function deleteAsset() {
		if (!selectedAsset || !selectedAsset.guid) {
			return;
		}

		// Set active asset to null
		setSelectedAsset(null);

		// Close confirmation popup
		setShowConfirmation(false);

		try {
			await assetService.delete(selectedAsset.guid);

			// Reload list
			if (childRef?.current) {
				childRef.current.reloadItems();
			}
		} catch (e) {
			alert('Could not delete asset.');
		}
	}

	function onSubmit() {
		// For Unsplash, trigger download event
		if (activeTab === 'unsplash' && selectedAsset?.downloadUrl) {
			unsplashService.downloadImage(selectedAsset.downloadUrl);
		}
		submitCallback(selectedAsset ? selectedAsset.url : '');
	}

	function renderActiveTab() {
		switch (activeTab) {
			case 'unsplash':
				return (
					<UnsplashGallery
						selectedAsset={selectedAsset}
						onSelect={setSelectedAsset}
						limit={25}
					/>
				);
			case 'uploads':
				return (
					<MyUploads
						selectedAsset={selectedAsset}
						onSelect={setSelectedAsset}
						limit={25}
						ref={childRef}
					/>
				);
			case 'link':
				return <LinkUpload assetType={assetType} onSelect={setSelectedAsset} />;
		}
	}

	return (
		<div className="assets-gallery">
			<div className="assets-gallery-flex">
				<aside>
					<section>
						<h3>Upload Media</h3>
						<FileUpload
							acceptType={assetType}
							enabled={uploadIsAvailable}
							errorCallback={uploadErrorCallback}
							postUploadCallback={postUpload}
							uploadApiUrl={`${assetService.baseApiUrl}/asset?${
								assetService.queryParams || ''
							}`}
							uploadStartCallback={uploadStartCallback}
							sizeLimitInMB={fileSizeLimitInMB}
							disabledCallback={uploadDisabledCallback}
						>
							<Button className="upload-button">
								<FontAwesomeIcon icon={faDesktop} />
								Upload from Computer
							</Button>
						</FileUpload>
						<Button
							className={activeTab === 'link' ? 'active' : ''}
							onClick={() => setActiveTab('link')}
						>
							<SystemIcon type="url" />
							Upload from Link
						</Button>
					</section>
					<section>
						<h3>Manage</h3>
						<Button
							className={activeTab === 'uploads' ? 'active' : ''}
							onClick={() => setActiveTab('uploads')}
						>
							My Files
						</Button>
					</section>
					{assetType === AssetType.IMAGE && (
						<section>
							<h3>Explore</h3>
							<Button
								className={activeTab === 'unsplash' ? 'active' : ''}
								onClick={() => setActiveTab('unsplash')}
							>
								Unsplash
							</Button>
						</section>
					)}
				</aside>
				<main>
					{renderActiveTab()}
					<footer className="buttons-wrapper">
						{activeTab === 'uploads' && (
							<Button
								color="transparent"
								disabled={!selectedAsset}
								onClick={() => setShowConfirmation(true)}
							>
								Delete
							</Button>
						)}
						<Button color="green" disabled={!selectedAsset} onClick={onSubmit}>
							Use Asset
						</Button>
					</footer>
				</main>
			</div>
			{selectedAsset && (
				<ConfirmationPopup
					approveCallback={deleteAsset}
					closeCallback={() => setShowConfirmation(false)}
					message={`
            <p>Are you sure you want to delete the following asset?</p>
            <p><strong>${selectedAsset.name}</strong></p>
          `}
					show={showConfirmation}
					title="Delete Asset"
				/>
			)}
		</div>
	);
};
