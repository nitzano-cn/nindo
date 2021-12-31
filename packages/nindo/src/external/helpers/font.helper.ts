export type FontT = {
	id: string;
	name: string;
	family?: string;
	url?: string;
};

export const fontsSizes: number[] = [10, 12, 14, 16, 18, 20, 24, 28, 32];

export const fontsList: FontT[] = [
	{
		id: 'default',
		name: 'Default',
	},
	{
		id: 'font_open_sans',
		name: 'Open Sans',
		family: '"Open Sans", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_arial',
		name: 'Arial',
		family: '"Arial"',
	},
	{
		id: 'font_david',
		name: 'David',
		family: '"David"',
	},
	{
		id: 'font_helvetica',
		name: 'Helvetica',
		family: '"Helvetica"',
	},
	{
		id: 'font_georgia',
		name: 'Georgia',
		family: '"Georgia"',
	},
	{
		id: 'font_times_new_roman',
		name: 'Times New Roman',
		family: '"Times New Roman", Times, serif',
	},
	{
		id: 'font_courier_new',
		name: 'Courier New',
		family: '"Courier New"',
	},
	{
		id: 'font_roboto',
		name: 'Roboto',
		family: '"Roboto", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_spartan',
		name: 'Spartan',
		family: '"Spartan", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Spartan:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_lato',
		name: 'Lato',
		family: '"Lato", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Lato:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_oswald',
		name: 'Oswald',
		family: '"Oswald", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_montserrat',
		name: 'Montserrat',
		family: '"Montserrat", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_lora',
		name: 'Lora',
		family: '"Lora", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Lora:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_pt_sans',
		name: 'PT Sans',
		family: '"PT Sans", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_raleway',
		name: 'Raleway',
		family: '"Raleway", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_source_sans_pro',
		name: 'Source Sans Pro',
		family: '"Source Sans Pro", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_nunito_sans',
		name: 'Nunito Sans',
		family: '"Nunito Sans", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_prompt',
		name: 'Prompt',
		family: '"Prompt", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Prompt:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_work_sans',
		name: 'Work Sans',
		family: '"Work Sans", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@200;300;500;700;800&display=swap',
	},
	{
		id: 'font_heebo',
		name: 'Heebo',
		family: '"Heebo", sans-serif',
		url: 'https://fonts.googleapis.com/css2?family=Heebo:wght@200;300;500;700;800&display=swap',
	},
];

export const oldFontMaping = new Map([
	[2, 'font_arial'],
	[1, 'default'],
	[6, 'font_montserrat'],
	[10, 'default'],
	[4, 'default'],
	[3, 'font_oswald'],
	[11, 'default'],
	[5, 'font_lora'],
	[9, 'default'],
	[8, 'default'],
	[7, 'default'],
]);

class FontHelper {
	public getFontDetails(fontId: string): FontT {
		try {
			const font = fontsList.filter((f) => f.id === fontId)[0];
			return font || fontsList[0];
		} catch (e) {
			return fontsList[0];
		}
	}
}

export const fontHelper = new FontHelper();
