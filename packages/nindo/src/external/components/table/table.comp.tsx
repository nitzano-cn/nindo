import React from 'react';

import { NinjaSkeleton } from '../skeleton/skeleton.comp';
import { TChildren } from '../../types/plugin.types';

import './table.scss';

interface ITableCell {
	content: TChildren;
	className?: string;
}

interface ITableRow {
	cells: ITableCell[];
	className?: string;
}

interface ITableProps {
	headers: TChildren[];
	rows: ITableRow[];
}

export const SkeletonTable = (props: { rows: number; cols: number }) => {
	const { cols, rows } = props;

	return (
		<div className="data-table-wrapper">
			<table className="data-table">
				<thead>
					<tr>
						{Array.from(new Array(cols)).map((col, idx) => (
							<th key={`th_skel_${idx}`}>
								<NinjaSkeleton count={1} />
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from(new Array(rows)).map((row, rIdx) => (
						<tr key={`row_skel_${rIdx}`}>
							{Array.from(new Array(cols)).map((col, cIdx) => (
								<td key={`td_skel_${rIdx}_${cIdx}`}>
									<NinjaSkeleton count={1} />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export const Table = (props: ITableProps) => {
	const { headers, rows } = props;

	return (
		<div className="data-table-wrapper">
			<table className="data-table">
				<thead>
					<tr>
						{headers.map((header) => (
							<th key={`th_${header}`}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row: ITableRow, idx: number) => (
						<tr key={`row_${idx}`} className={row.className || ''}>
							{row.cells.map((cell: ITableCell, cellIdx: number) => (
								<td
									key={`cell_${idx}_${cellIdx}`}
									className={cell.className || ''}
								>
									{cell.content}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
