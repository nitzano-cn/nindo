import React, { useState, useEffect, Component, useRef } from 'react';
import ReactDOM from 'react-dom';
import { SketchPicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import { IColorResult } from '../../types/color.types';

import './colorPicker.scss';

type TColorPickerPosition = 'top' | 'left' | 'bottom' | 'right';

interface IPortalColorPickerProps {
	className: string;
	triggerElmRef?: any;
	position?: TColorPickerPosition;
}

interface ColorPickerProps {
	selectedColor: string;
	onChange: (color: IColorResult) => void;
	defaultColor?: string;
	colorFormat?: 'hex' | 'hsl' | 'rgb';
	showUndo?: boolean;
	disabled?: boolean;
	position?: TColorPickerPosition;
	enableTransparency?: boolean;
}

const isSSR: boolean = typeof document === 'undefined';
let portalRoot: any = null;

if (!isSSR) {
	portalRoot = document.getElementById('color-picker-portal') as HTMLDivElement;

	if (!portalRoot) {
		portalRoot = document.createElement('div');
		portalRoot.setAttribute('id', 'color-picker-portal');
		document.body.append(portalRoot);
	}
}

class PortalColorPicker extends Component<IPortalColorPickerProps> {
	private el: HTMLElement;

	constructor(props: any) {
		super(props);

		const div = document?.createElement('div');
		div.className = props.className;
		this.el = div;
		this.setElmPosition();
	}

	componentDidMount = () => {
		document.querySelectorAll('.color-picker').forEach((a) => {
			a.remove();
		});
		portalRoot.appendChild(this.el);
		window?.addEventListener('scroll', this.setElmPosition);
	};

	componentWillUnmount = () => {
		window?.removeEventListener('scroll', this.setElmPosition);
	};

	setElmPosition = () => {
		const { triggerElmRef, position } = this.props;

		if (!this.el || !triggerElmRef || !triggerElmRef.current) {
			return;
		}

		const triggerElm: HTMLDivElement = triggerElmRef.current;
		const bounding = triggerElm.getBoundingClientRect();
		const scrollTop = window?.scrollY;
		const spacing = 20;

		switch (position) {
			case 'top':
				this.el.style.top = `${scrollTop + bounding.top - spacing}px`;
				this.el.style.left = `${bounding.left + bounding.width / 2}px`;
				this.el.style.transform = 'translateX(-50%) translateY(-100%)';
				break;
			case 'bottom':
				this.el.style.top = `${
					scrollTop + bounding.top + bounding.height + spacing
				}px`;
				this.el.style.left = `${bounding.left + bounding.width / 2}px`;
				this.el.style.transform = 'translateX(-50%)';
				break;
			case 'left':
				this.el.style.top = `${scrollTop + bounding.top}px`;
				this.el.style.left = `${bounding.left - spacing}px`;
				this.el.style.transform = 'translateX(-100%)';
				break;
			case 'right':
			default:
				this.el.style.top = `${scrollTop + bounding.top}px`;
				this.el.style.left = `${bounding.left + bounding.width + spacing}px`;
		}
	};

	render() {
		return ReactDOM.createPortal(this.props.children, this.el);
	}
}

export const ColorPicker = (props: ColorPickerProps) => {
	const {
		selectedColor,
		onChange,
		position,
		showUndo,
		disabled,
		enableTransparency,
		defaultColor,
		colorFormat,
	} = props;
	const [opened, setOpened] = useState<boolean>(false);
	const colorPickerCompRef: any = useRef<HTMLDivElement>();

	function colorChanged(color: IColorResult) {
		let finalColor: any = color;
		// For `ColorResult` objects
		if (colorFormat && typeof color === 'object') {
			finalColor = color?.[colorFormat];

			if (colorFormat === 'hex') {
				finalColor = `#${finalColor.replace('#', '')}`;
			} else if (colorFormat === 'rgb') {
				finalColor = `rgba(${finalColor.r}, ${finalColor.g}, ${finalColor.b}, ${finalColor.a})`;
			} else if (colorFormat === 'hsl') {
				finalColor = `hsla(${finalColor.h}, ${finalColor.s}%, ${finalColor.l}%, ${finalColor.a})`;
			}
		}
		onChange(finalColor);
	}

	function handleOutsideClick(e: MouseEvent) {
		e.stopPropagation();

		const target = e.target as HTMLElement;

		if (target && !target.closest('.color-picker')) {
			setOpened(false);
		}
	}

	function toggle() {
		if (disabled) {
			colorChanged(null);
			return;
		}
		setOpened(!opened);
	}

	useEffect(() => {
		window?.addEventListener('mousedown', handleOutsideClick);

		return () => {
			window?.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	return (
		<div className="color-picker-wrapper">
			<div
				className={`selected-color ${
					!selectedColor || !selectedColor.length ? 'none' : ''
				}`}
				title={selectedColor ? 'Click to change' : 'Default color'}
				onClick={(e) => toggle()}
				style={{
					backgroundColor: selectedColor,
				}}
				ref={colorPickerCompRef}
			></div>
			{opened && (
				<PortalColorPicker
					className={'color-picker'}
					triggerElmRef={colorPickerCompRef}
					position={position}
				>
					<SketchPicker
						color={selectedColor}
						onChange={colorChanged}
						disableAlpha={!enableTransparency}
					/>
				</PortalColorPicker>
			)}
			{showUndo && selectedColor && (
				<div
					className="undo"
					title="Restore to default"
					onClick={() => colorChanged(defaultColor || '')}
				>
					<FontAwesomeIcon icon={faUndoAlt} />
				</div>
			)}
		</div>
	);
};
