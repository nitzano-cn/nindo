import React, { useState } from 'react';
import { Button } from '../button/button.comp';
import { exportService, pluginService } from '../../../internal/services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

interface IExportElementButtonProps {
	exportSelector: string;
	exportUrl: string;
	exportFormat: 'image' | 'pdf';
	exportWidth?: number;
	exportHeight?: number;
	exportDelay?: number;
	exportHideElements?: string[];
	buttonTitle?: string;
	fileName?: string;
	automaticallyDownload?: boolean;
	exportStartCallback?: () => void;
	successCallback?: (url: string) => void;
	errorCallback?: (e: Error) => void;
}

export const ExportElementButton = ({
	exportUrl,
	automaticallyDownload,
	exportSelector,
	exportHideElements,
	exportFormat,
	fileName,
	buttonTitle,
	exportDelay,
	exportWidth,
	exportHeight,
	exportStartCallback,
	successCallback,
	errorCallback,
}: IExportElementButtonProps) => {
	const [exporting, setExporting] = useState<boolean>(false);

	async function fetchJobStatus(jobId: number) {
		const startTime = Date.now();

		try {
			const jobStatus = await exportService.getJobStatus(jobId);

			if (!jobStatus.success) {
				throw new Error('Could not export image');
			}

			const status = jobStatus.data.status;

			if (status === 'processing') {
				const timeDiff = 1500 - (Date.now() - startTime);

				return window.setTimeout(() => {
					fetchJobStatus(jobId);
				}, timeDiff);
			} else if (status === 'error') {
				throw new Error('Could not export image');
			}

			if (automaticallyDownload) {
				const link = document.createElement('a');
				link.download = `${fileName || 'download'}.png`;
				link.href = jobStatus.data.imageUrl;
				link.click();
			}

			successCallback?.(jobStatus.data.imageUrl);
		} catch (e) {
			errorCallback?.(e as Error);
		}

		setExporting(false);

		return true;
	}

	async function exportElm() {
		if (exporting) {
			return;
		}

		setExporting(true);

		exportStartCallback?.();

		try {
			const job = await exportService.createExportJobForUrl({
				url: exportUrl,
				format: exportFormat || 'image',
				selector: exportSelector,
				delay: exportDelay,
				width: exportWidth,
				height: exportHeight,
				hideElements: exportHideElements,
			});

			if (job.success && job.data.jobId) {
				fetchJobStatus(job.data.jobId);
			} else {
				throw new Error();
			}
		} catch (e) {
			errorCallback?.(e as Error);
		}
	}

	return (
		<Button className="export-elm" onClick={exportElm}>
			<FontAwesomeIcon icon={faDownload} title={buttonTitle || 'Download'} />
		</Button>
	);
};

export default ExportElementButton;
