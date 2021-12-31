import React, { CSSProperties, ReactNode } from 'react';
//@ts-ignore
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import './slider.scss';

interface SliderMark {
	[key: number]: ReactNode | string;
}

interface ISliderProps {
	min: number;
	max: number;
	step: number | null;
	value: number;
	theme: 'light' | 'dark';
	onChange: (num: number) => void;
	tooltipFormatter?: (num: number) => string;
	marks?: SliderMark;
	styles?: ISliderTheme;
	dots?: boolean;
	disabled?: boolean;
	disableTooltip?: boolean;
}

interface ISliderTheme {
	railStyle?: CSSProperties;
	dotStyle?: CSSProperties;
	activeDotStyle?: CSSProperties;
	trackStyle?: CSSProperties;
	handleStyle?: CSSProperties;
	markStyle?: CSSProperties;
	tooltipStyle?: CSSProperties;
}

const darkTheme: ISliderTheme = {
	railStyle: {
		backgroundColor: '#8a949d',
	},
	dotStyle: {
		borderColor: '#8a949d',
	},
	activeDotStyle: {
		borderColor: '#fff',
	},
	trackStyle: {
		backgroundColor: '#fff',
	},
	handleStyle: {
		borderColor: '#8a949d',
	},
	markStyle: {
		color: '#8a949d',
	},
	tooltipStyle: {
		backgroundColor: '#fff',
		color: '#8a949d',
	},
};

const lightTheme: ISliderTheme = {
	railStyle: {
		backgroundColor: '#dce0e9',
	},
	dotStyle: {
		borderColor: '#dce0e9',
	},
	activeDotStyle: {
		borderColor: '#8e979c',
	},
	trackStyle: {
		backgroundColor: '#8e979c',
	},
	handleStyle: {
		borderColor: '#8e979c',
	},
	markStyle: {
		color: '#8e979c',
	},
	tooltipStyle: {
		backgroundColor: '#8e979c',
	},
};

export const NinjaSlider = (props: ISliderProps) => {
	const {
		min,
		max,
		step,
		disabled,
		marks,
		dots,
		value,
		tooltipFormatter,
		disableTooltip,
		theme,
		styles,
		onChange,
	} = props;
	const railStyle = Object.assign(
		{},
		theme === 'light' ? lightTheme.railStyle : darkTheme.railStyle,
		styles?.railStyle || {}
	);
	const dotStyle = Object.assign(
		{},
		theme === 'light' ? lightTheme.dotStyle : darkTheme.dotStyle,
		styles?.dotStyle || {}
	);
	const activeDotStyle = Object.assign(
		{},
		theme === 'light' ? lightTheme.activeDotStyle : darkTheme.activeDotStyle,
		styles?.activeDotStyle || {}
	);
	const tooltipStyle = Object.assign(
		{},
		theme === 'light' ? lightTheme.tooltipStyle : darkTheme.tooltipStyle,
		styles?.tooltipStyle || {}
	);
	const handleStyle = Object.assign(
		{},
		theme === 'light' ? lightTheme.handleStyle : darkTheme.handleStyle,
		styles?.handleStyle || {}
	);
	const trackStyle = Object.assign(
		{},
		theme === 'light' ? lightTheme.trackStyle : darkTheme.trackStyle,
		styles?.trackStyle || {}
	);
	const finalMarks: any = {};

	if (marks) {
		Object.keys(marks).forEach((key: any) => {
			finalMarks[key] = {
				label: marks[key],
				style: Object.assign(
					{},
					theme === 'light' ? lightTheme.markStyle : darkTheme.markStyle
				),
			};
		});
	}

	function handle(props: any) {
		const { value, dragging, index, ...restProps } = props;

		if (disableTooltip) {
			return <Slider.Handle value={value} {...restProps} />;
		}

		return (
			<Slider.Handle value={value} {...restProps}>
				<div className={`slider-tooltip${dragging ? ' active' : ''}`}>
					<span className="slider-tooltip-inner" style={{ ...tooltipStyle }}>
						{tooltipFormatter ? tooltipFormatter(value) : value}
						<span
							className="after"
							style={{ borderTopColor: tooltipStyle.backgroundColor || '' }}
						></span>
					</span>
				</div>
			</Slider.Handle>
		);
	}

	function inputChanged(num: number) {
		onChange(num);
	}

	return (
		<div className="cn-slider">
			<Slider
				min={min}
				max={max}
				step={step}
				disabled={disabled}
				dots={dots}
				value={value}
				marks={finalMarks}
				railStyle={railStyle}
				dotStyle={dotStyle}
				activeDotStyle={activeDotStyle}
				handleStyle={handleStyle}
				trackStyle={trackStyle}
				handle={handle}
				onChange={inputChanged}
			/>
		</div>
	);
};
