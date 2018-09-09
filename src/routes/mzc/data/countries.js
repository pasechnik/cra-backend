const countries = {
  list: [{
    iso_name: 'Afghanistan', iso_code2: 'AF', iso_code3: 'AFG', capital: 'Kabul',
  }, {
    iso_name: 'Albania', iso_code2: 'AL', iso_code3: 'ALB', capital: 'Tirana',
  }, {
    iso_name: 'Algeria', iso_code2: 'DZ', iso_code3: 'DZA', capital: 'Algiers',
  }, {
    iso_name: 'American Samoa',
    iso_code2: 'AS',
    iso_code3: 'ASM',
    capital: 'Pago Pago',
  }, {
    iso_name: 'Andorra',
    iso_code2: 'AD',
    iso_code3: 'AND',
    capital: 'Andorra la Vella',
  }, {
    iso_name: 'Angola', iso_code2: 'AO', iso_code3: 'AGO', capital: 'Luanda',
  }, {
    iso_name: 'Anguilla',
    iso_code2: 'AI',
    iso_code3: 'AIA',
    capital: 'The Valley',
  }, {
    iso_name: 'Antigua and Barbuda',
    iso_code2: 'AG',
    iso_code3: 'ATG',
    capital: 'St. John\'s',
  }, {
    iso_name: 'Argentina',
    iso_code2: 'AR',
    iso_code3: 'ARG',
    capital: 'Buenos Aires',
  }, {
    iso_name: 'Armenia', iso_code2: 'AM', iso_code3: 'ARM', capital: 'Yerevan',
  }, {
    iso_name: 'Aruba',
    iso_code2: 'AW',
    iso_code3: 'ABW',
    capital: 'Oranjestad',
  }, {
    iso_name: 'Australia', iso_code2: 'AU', iso_code3: 'AUS', capital: 'Canberra',
  }, {
    iso_name: 'Austria',
    iso_code2: 'AT',
    iso_code3: 'AUT',
    capital: 'Vienna',
  }, {
    iso_name: 'Azerbaijan', iso_code2: 'AZ', iso_code3: 'AZE', capital: 'Baku',
  }, {
    iso_name: 'Bahamas',
    iso_code2: 'BS',
    iso_code3: 'BHS',
    capital: 'Nassau',
  }, {
    iso_name: 'Bahrain', iso_code2: 'BH', iso_code3: 'BHR', capital: 'Manama',
  }, {
    iso_name: 'Bangladesh',
    iso_code2: 'BD',
    iso_code3: 'BGD',
    capital: 'Dhaka',
  }, {
    iso_name: 'Barbados',
    iso_code2: 'BB',
    iso_code3: 'BRB',
    capital: 'Bridgetown',
  }, {
    iso_name: 'Belarus', iso_code2: 'BY', iso_code3: 'BLR', capital: 'Minsk',
  }, {
    iso_name: 'Belgium',
    iso_code2: 'BE',
    iso_code3: 'BEL',
    capital: 'Brussels',
  }, {
    iso_name: 'Belize', iso_code2: 'BZ', iso_code3: 'BLZ', capital: 'Belmopan',
  }, {
    iso_name: 'Benin',
    iso_code2: 'BJ',
    iso_code3: 'BEN',
    capital: 'Porto-Novo',
  }, {
    iso_name: 'Bermuda', iso_code2: 'BM', iso_code3: 'BMU', capital: 'Hamilton',
  }, {
    iso_name: 'Bhutan',
    iso_code2: 'BT',
    iso_code3: 'BTN',
    capital: 'Thimphu',
  }, {
    iso_name: 'Bolivia',
    iso_code2: 'BO',
    iso_code3: 'BOL',
    capital: 'Sucre',
  }, {
    iso_name: 'Bonaire; Sint Eustatius; Saba',
    iso_code2: 'BQ',
    iso_code3: 'BES',
    capital: null,
  }, {
    iso_name: 'Bosnia and Herzegowina',
    iso_code2: 'BA',
    iso_code3: 'BIH',
    capital: 'Sarajevo',
  }, {
    iso_name: 'Botswana', iso_code2: 'BW', iso_code3: 'BWA', capital: 'Gaborone',
  }, {
    iso_name: 'Brazil',
    iso_code2: 'BR',
    iso_code3: 'BRA',
    capital: 'Bras\u00edlia',
  }, {
    iso_name: 'British Indian Ocean Territory',
    iso_code2: 'IO',
    iso_code3: 'IOT',
    capital: 'British Indian Ocean Territory',
  }, {
    iso_name: 'Brunei Darussalam',
    iso_code2: 'BN',
    iso_code3: 'BRN',
    capital: 'Bandar Seri Begawan',
  }, {
    iso_name: 'Bulgaria',
    iso_code2: 'BG',
    iso_code3: 'BGR',
    capital: 'Sofia',
  }, {
    iso_name: 'Burkina Faso',
    iso_code2: 'BF',
    iso_code3: 'BFA',
    capital: 'Ouagadougou',
  }, {
    iso_name: 'Burundi', iso_code2: 'BI', iso_code3: 'BDI', capital: 'Bujumbura',
  }, {
    iso_name: 'Cambodia',
    iso_code2: 'KH',
    iso_code3: 'KHM',
    capital: 'Phnom Penh',
  }, {
    iso_name: 'Cameroon',
    iso_code2: 'CM',
    iso_code3: 'CMR',
    capital: 'Yaound\u00e9',
  }, {
    iso_name: 'Canada', iso_code2: 'CA', iso_code3: 'CAN', capital: 'Ottawa',
  }, {
    iso_name: 'Cape Verde',
    iso_code2: 'CV',
    iso_code3: 'CPV',
    capital: 'Praia',
  }, {
    iso_name: 'Cayman Islands',
    iso_code2: 'KY',
    iso_code3: 'CYM',
    capital: 'George Town',
  }, {
    iso_name: 'Central African Republic',
    iso_code2: 'CF',
    iso_code3: 'CAF',
    capital: 'Bangui',
  }, {
    iso_name: 'Chad', iso_code2: 'TD', iso_code3: 'TCD', capital: 'N\'Djamena',
  }, {
    iso_name: 'Chile',
    iso_code2: 'CL',
    iso_code3: 'CHL',
    capital: 'Santiago',
  }, {
    iso_name: 'China', iso_code2: 'CN', iso_code3: 'CHN', capital: 'Beijing',
  }, {
    iso_name: 'Colombia',
    iso_code2: 'CO',
    iso_code3: 'COL',
    capital: 'Bogot\u00e1',
  }, {
    iso_name: 'Comoros', iso_code2: 'KM', iso_code3: 'COM', capital: 'Moroni',
  }, {
    iso_name: 'Congo',
    iso_code2: 'CG',
    iso_code3: 'COG',
    capital: 'Brazzaville',
  }, {
    iso_name: 'Congo The Democratic Republic of The',
    iso_code2: 'CD',
    iso_code3: 'COD',
    capital: 'Kinshasa',
  }, {
    iso_name: 'Cook Islands',
    iso_code2: 'CK',
    iso_code3: 'COK',
    capital: 'Avarua',
  }, {
    iso_name: 'Costa Rica',
    iso_code2: 'CR',
    iso_code3: 'CRI',
    capital: 'San Jos\u00e9',
  }, {
    iso_name: 'Cote D\'ivoire',
    iso_code2: 'CI',
    iso_code3: 'CIV',
    capital: 'Yamoussoukro',
  }, {
    iso_name: 'Croatia (LOCAL Name: Hrvatska)',
    iso_code2: 'HR',
    iso_code3: 'HRV',
    capital: 'Zagreb',
  }, {
    iso_name: 'Cuba', iso_code2: 'CU', iso_code3: 'CUB', capital: 'Havana',
  }, {
    iso_name: 'Curacao',
    iso_code2: 'CW',
    iso_code3: 'CUW',
    capital: null,
  }, {
    iso_name: 'Cyprus',
    iso_code2: 'CY',
    iso_code3: 'CYP',
    capital: 'Nicosia',
  }, {
    iso_name: 'Czech Republic',
    iso_code2: 'CZ',
    iso_code3: 'CZE',
    capital: 'Prague',
  }, {
    iso_name: 'Denmark',
    iso_code2: 'DK',
    iso_code3: 'DNK',
    capital: 'Copenhagen',
  }, {
    iso_name: 'Djibouti', iso_code2: 'DJ', iso_code3: 'DJI', capital: 'Djibouti',
  }, {
    iso_name: 'Dominica',
    iso_code2: 'DM',
    iso_code3: 'DMA',
    capital: 'Roseau',
  }, {
    iso_name: 'Dominican Republic',
    iso_code2: 'DO',
    iso_code3: 'DOM',
    capital: 'Santo Domingo',
  }, {
    iso_name: 'Ecuador', iso_code2: 'EC', iso_code3: 'ECU', capital: 'Quito',
  }, {
    iso_name: 'Egypt',
    iso_code2: 'EG',
    iso_code3: 'EGY',
    capital: 'Cairo',
  }, {
    iso_name: 'El Salvador',
    iso_code2: 'SV',
    iso_code3: 'SLV',
    capital: 'San Salvador',
  }, {
    iso_name: 'Equatorial Guinea',
    iso_code2: 'GQ',
    iso_code3: 'GNQ',
    capital: 'Malabo',
  }, {
    iso_name: 'Eritrea', iso_code2: 'ER', iso_code3: 'ERI', capital: 'Asmara',
  }, {
    iso_name: 'Estonia',
    iso_code2: 'EE',
    iso_code3: 'EST',
    capital: 'Tallinn',
  }, {
    iso_name: 'Ethiopia',
    iso_code2: 'ET',
    iso_code3: 'ETH',
    capital: 'Addis Ababa',
  }, {
    iso_name: 'Faroe Islands',
    iso_code2: 'FO',
    iso_code3: 'FRO',
    capital: 'T\u00f3rshavn',
  }, {
    iso_name: 'Fiji', iso_code2: 'FJ', iso_code3: 'FJI', capital: 'Suva',
  }, {
    iso_name: 'Finland',
    iso_code2: 'FI',
    iso_code3: 'FIN',
    capital: 'Helsinki',
  }, {
    iso_name: 'France', iso_code2: 'FR', iso_code3: 'FRA', capital: 'Paris',
  }, {
    iso_name: 'French Guiana',
    iso_code2: 'GF',
    iso_code3: 'GUF',
    capital: 'Cayenne',
  }, {
    iso_name: 'French Polynesia',
    iso_code2: 'PF',
    iso_code3: 'PYF',
    capital: 'Papeete',
  }, {
    iso_name: 'Gabon', iso_code2: 'GA', iso_code3: 'GAB', capital: 'Libreville',
  }, {
    iso_name: 'Gambia',
    iso_code2: 'GM',
    iso_code3: 'GMB',
    capital: 'Banjul',
  }, {
    iso_name: 'Georgia', iso_code2: 'GE', iso_code3: 'GEO', capital: 'Tbilisi',
  }, {
    iso_name: 'Germany',
    iso_code2: 'DE',
    iso_code3: 'DEU',
    capital: 'Berlin',
  }, {
    iso_name: 'Ghana', iso_code2: 'GH', iso_code3: 'GHA', capital: 'Accra',
  }, {
    iso_name: 'Gibraltar',
    iso_code2: 'GI',
    iso_code3: 'GIB',
    capital: 'Gibraltar',
  }, {
    iso_name: 'Greece', iso_code2: 'GR', iso_code3: 'GRC', capital: 'Athens',
  }, {
    iso_name: 'Greenland',
    iso_code2: 'GL',
    iso_code3: 'GRL',
    capital: 'Nuuk',
  }, {
    iso_name: 'Grenada',
    iso_code2: 'GD',
    iso_code3: 'GRD',
    capital: 'St. George\'s',
  }, {
    iso_name: 'Guadeloupe',
    iso_code2: 'GP',
    iso_code3: 'GLP',
    capital: 'Basse-Terre',
  }, {
    iso_name: 'Guam',
    iso_code2: 'GU',
    iso_code3: 'GUM',
    capital: 'Hag\u00e5t\u00f1a',
  }, {
    iso_name: 'Guatemala',
    iso_code2: 'GT',
    iso_code3: 'GTM',
    capital: 'Guatemala City',
  }, {
    iso_name: 'Guernsey', iso_code2: 'GG', iso_code3: 'GGY', capital: null,
  }, {
    iso_name: 'Guinea',
    iso_code2: 'GN',
    iso_code3: 'GIN',
    capital: 'Malabo',
  }, {
    iso_name: 'Guinea-bissau',
    iso_code2: 'GW',
    iso_code3: 'GNB',
    capital: 'Bissau',
  }, {
    iso_name: 'Guyana', iso_code2: 'GY', iso_code3: 'GUY', capital: 'Georgetown',
  }, {
    iso_name: 'Haiti',
    iso_code2: 'HT',
    iso_code3: 'HTI',
    capital: 'Port-au-Prince',
  }, {
    iso_name: 'Holy See (VATICAN City State)',
    iso_code2: 'VA',
    iso_code3: 'VAT',
    capital: 'Vatican City',
  }, {
    iso_name: 'Honduras',
    iso_code2: 'HN',
    iso_code3: 'HND',
    capital: 'Tegucigalpa',
  }, {
    iso_name: 'Hong Kong',
    iso_code2: 'HK',
    iso_code3: 'HKG',
    capital: 'Hong Kong',
  }, {
    iso_name: 'Hungary', iso_code2: 'HU', iso_code3: 'HUN', capital: 'Budapest',
  }, {
    iso_name: 'Iceland',
    iso_code2: 'IS',
    iso_code3: 'ISL',
    capital: 'Reykjavik',
  }, {
    iso_name: 'India',
    iso_code2: 'IN',
    iso_code3: 'IND',
    capital: 'British Indian Ocean Territory',
  }, {
    iso_name: 'Indonesia',
    iso_code2: 'ID',
    iso_code3: 'IDN',
    capital: 'Jakarta',
  }, {
    iso_name: 'Iran (ISLAMIC Republic Of)',
    iso_code2: 'IR',
    iso_code3: 'IRN',
    capital: 'Tehran',
  }, {
    iso_name: 'Iraq', iso_code2: 'IQ', iso_code3: 'IRQ', capital: 'Baghdad',
  }, {
    iso_name: 'Ireland',
    iso_code2: 'IE',
    iso_code3: 'IRL',
    capital: 'Dublin',
  }, {
    iso_name: 'Isle of Man', iso_code2: 'IM', iso_code3: 'IMN', capital: null,
  }, {
    iso_name: 'Israel',
    iso_code2: 'IL',
    iso_code3: 'ISR',
    capital: 'Jerusalem',
  }, {
    iso_name: 'Italy', iso_code2: 'IT', iso_code3: 'ITA', capital: 'Rome',
  }, {
    iso_name: 'Jamaica',
    iso_code2: 'JM',
    iso_code3: 'JAM',
    capital: 'Kingston',
  }, {
    iso_name: 'Japan', iso_code2: 'JP', iso_code3: 'JPN', capital: 'Tokyo',
  }, {
    iso_name: 'Jersey',
    iso_code2: 'JE',
    iso_code3: 'JEY',
    capital: null,
  }, {
    iso_name: 'Jordan', iso_code2: 'JO', iso_code3: 'JOR', capital: 'Amman',
  }, {
    iso_name: 'Kazakhstan',
    iso_code2: 'KZ',
    iso_code3: 'KAZ',
    capital: 'Astana',
  }, {
    iso_name: 'Kenya', iso_code2: 'KE', iso_code3: 'KEN', capital: 'Nairobi',
  }, {
    iso_name: 'Kiribati',
    iso_code2: 'KI',
    iso_code3: 'KIR',
    capital: 'Tarawa',
  }, {
    iso_name: 'Korea Democratic People\'s Republic of',
    iso_code2: 'KP',
    iso_code3: 'PRK',
    capital: 'Pyongyang',
  }, {
    iso_name: 'Korea, Republic of',
    iso_code2: 'KR',
    iso_code3: 'KOR',
    capital: 'Seoul',
  }, {
    iso_name: 'Kuwait',
    iso_code2: 'KW',
    iso_code3: 'KWT',
    capital: 'Kuwait City',
  }, {
    iso_name: 'Kyrgyzstan',
    iso_code2: 'KG',
    iso_code3: 'KGZ',
    capital: 'Bishkek',
  }, {
    iso_name: 'Lao People\'s Democratic Republic',
    iso_code2: 'LA',
    iso_code3: 'LAO',
    capital: 'Vientiane',
  }, {
    iso_name: 'Latvia', iso_code2: 'LV', iso_code3: 'LVA', capital: 'Riga',
  }, {
    iso_name: 'Lebanon',
    iso_code2: 'LB',
    iso_code3: 'LBN',
    capital: 'Beirut',
  }, {
    iso_name: 'Lesotho', iso_code2: 'LS', iso_code3: 'LSO', capital: 'Maseru',
  }, {
    iso_name: 'Liberia',
    iso_code2: 'LR',
    iso_code3: 'LBR',
    capital: 'Monrovia',
  }, {
    iso_name: 'Libyan Arab Jamahiriya',
    iso_code2: 'LY',
    iso_code3: 'LBY',
    capital: 'Tripoli',
  }, {
    iso_name: 'Liechtenstein',
    iso_code2: 'LI',
    iso_code3: 'LIE',
    capital: 'Vaduz',
  }, {
    iso_name: 'Lithuania',
    iso_code2: 'LT',
    iso_code3: 'LTU',
    capital: 'Vilnius',
  }, {
    iso_name: 'Luxembourg',
    iso_code2: 'LU',
    iso_code3: 'LUX',
    capital: 'Luxembourg City',
  }, {
    iso_name: 'Macau',
    iso_code2: 'MO',
    iso_code3: 'MAC',
    capital: '\tCiudad de Macao',
  }, {
    iso_name: 'Macedonia',
    iso_code2: 'MK',
    iso_code3: 'MKD',
    capital: 'Skopje',
  }, {
    iso_name: 'Madagascar',
    iso_code2: 'MG',
    iso_code3: 'MDG',
    capital: 'Antananarivo',
  }, {
    iso_name: 'Malawi', iso_code2: 'MW', iso_code3: 'MWI', capital: 'Lilongwe',
  }, {
    iso_name: 'Malaysia',
    iso_code2: 'MY',
    iso_code3: 'MYS',
    capital: 'Kuala Lumpur',
  }, {
    iso_name: 'Maldives', iso_code2: 'MV', iso_code3: 'MDV', capital: 'Mal\u00e9',
  }, {
    iso_name: 'Mali',
    iso_code2: 'ML',
    iso_code3: 'MLI',
    capital: 'Bamako',
  }, {
    iso_name: 'Malta',
    iso_code2: 'MT',
    iso_code3: 'MLT',
    capital: 'Valletta',
  }, {
    iso_name: 'Marshall Islands',
    iso_code2: 'MH',
    iso_code3: 'MHL',
    capital: 'Majuro',
  }, {
    iso_name: 'Martinique',
    iso_code2: 'MQ',
    iso_code3: 'MTQ',
    capital: 'Fort-de-France',
  }, {
    iso_name: 'Mauritania',
    iso_code2: 'MR',
    iso_code3: 'MRT',
    capital: 'Nouakchott',
  }, {
    iso_name: 'Mauritius',
    iso_code2: 'MU',
    iso_code3: 'MUS',
    capital: 'Port Louis',
  }, {
    iso_name: 'Mayotte', iso_code2: 'YT', iso_code3: 'MYT', capital: 'Mamoudzou',
  }, {
    iso_name: 'Mexico',
    iso_code2: 'MX',
    iso_code3: 'MEX',
    capital: 'Mexico City',
  }, {
    iso_name: 'Micronesia Federated States of',
    iso_code2: 'FM',
    iso_code3: 'FSM',
    capital: 'Palikir',
  }, {
    iso_name: 'Moldova Republic of',
    iso_code2: 'MD',
    iso_code3: 'MDA',
    capital: null,
  }, {
    iso_name: 'Monaco', iso_code2: 'MC', iso_code3: 'MCO', capital: 'Monaco',
  }, {
    iso_name: 'Mongolia',
    iso_code2: 'MN',
    iso_code3: 'MNG',
    capital: 'Ulaanbaatar',
  }, {
    iso_name: 'Montenegro',
    iso_code2: 'ME',
    iso_code3: 'MNE',
    capital: 'Belgrade',
  }, {
    iso_name: 'Montserrat',
    iso_code2: 'MS',
    iso_code3: 'MSR',
    capital: 'Plymouth',
  }, {
    iso_name: 'Morocco', iso_code2: 'MA', iso_code3: 'MAR', capital: 'Rabat',
  }, {
    iso_name: 'Mozambique',
    iso_code2: 'MZ',
    iso_code3: 'MOZ',
    capital: 'Maputo',
  }, {
    iso_name: 'Myanmar', iso_code2: 'MM', iso_code3: 'MMR', capital: 'Naypyidaw',
  }, {
    iso_name: 'Namibia',
    iso_code2: 'NA',
    iso_code3: 'NAM',
    capital: 'Windhoek',
  }, {
    iso_name: 'Nauru', iso_code2: 'NR', iso_code3: 'NRU', capital: 'Yaren District',
  }, {
    iso_name: 'Nepal',
    iso_code2: 'NP',
    iso_code3: 'NPL',
    capital: 'Kathmandu',
  }, {
    iso_name: 'Netherlands',
    iso_code2: 'NL',
    iso_code3: 'NLD',
    capital: 'Amsterdam',
  }, {
    iso_name: 'New Caledonia',
    iso_code2: 'NC',
    iso_code3: 'NCL',
    capital: 'Noum\u00e9a',
  }, {
    iso_name: 'New Zealand',
    iso_code2: 'NZ',
    iso_code3: 'NZL',
    capital: 'Wellington',
  }, {
    iso_name: 'Nicaragua', iso_code2: 'NI', iso_code3: 'NIC', capital: 'Managua',
  }, {
    iso_name: 'Niger',
    iso_code2: 'NE',
    iso_code3: 'NER',
    capital: 'Niamey',
  }, {
    iso_name: 'Nigeria', iso_code2: 'NG', iso_code3: 'NGA', capital: 'Abuja',
  }, {
    iso_name: 'Niue',
    iso_code2: 'NU',
    iso_code3: 'NIU',
    capital: 'Alofi',
  }, {
    iso_name: 'Non-spec Asia Pas Location',
    iso_code2: 'AP',
    iso_code3: 'AFR',
    capital: null,
  }, {
    iso_name: 'Norfolk Island',
    iso_code2: 'NF',
    iso_code3: 'NFK',
    capital: 'Kingston',
  }, {
    iso_name: 'Northern Mariana Islands',
    iso_code2: 'MP',
    iso_code3: 'MNP',
    capital: 'Saipan',
  }, {
    iso_name: 'Norway', iso_code2: 'NO', iso_code3: 'NOR', capital: 'Oslo',
  }, {
    iso_name: 'Oman',
    iso_code2: 'OM',
    iso_code3: 'OMN',
    capital: 'Muscat',
  }, {
    iso_name: 'Pakistan', iso_code2: 'PK', iso_code3: 'PAK', capital: 'Islamabad',
  }, {
    iso_name: 'Palau',
    iso_code2: 'PW',
    iso_code3: 'PLW',
    capital: 'Ngerulmud',
  }, {
    iso_name: 'Palestinian Territory Occupied',
    iso_code2: 'PS',
    iso_code3: 'PSE',
    capital: 'Jerusalem',
  }, {
    iso_name: 'Panama',
    iso_code2: 'PA',
    iso_code3: 'PAN',
    capital: 'Panama City',
  }, {
    iso_name: 'Papua New Guinea',
    iso_code2: 'PG',
    iso_code3: 'PNG',
    capital: 'Port Moresby',
  }, {
    iso_name: 'Paraguay',
    iso_code2: 'PY',
    iso_code3: 'PRY',
    capital: 'Asunci\u00f3n',
  }, {
    iso_name: 'Peru', iso_code2: 'PE', iso_code3: 'PER', capital: 'Lima',
  }, {
    iso_name: 'Philippines',
    iso_code2: 'PH',
    iso_code3: 'PHL',
    capital: 'Manila',
  }, {
    iso_name: 'Poland', iso_code2: 'PL', iso_code3: 'POL', capital: 'Warsaw',
  }, {
    iso_name: 'Portugal',
    iso_code2: 'PT',
    iso_code3: 'PRT',
    capital: 'Lisbon',
  }, {
    iso_name: 'Puerto Rico', iso_code2: 'PR', iso_code3: 'PRI', capital: 'San Juan',
  }, {
    iso_name: 'Qatar',
    iso_code2: 'QA',
    iso_code3: 'QAT',
    capital: 'Doha',
  }, {
    iso_name: 'Reserved', iso_code2: 'ZZ', iso_code3: 'ZZZ', capital: null,
  }, {
    iso_name: 'Reunion',
    iso_code2: 'RE',
    iso_code3: 'REU',
    capital: 'Saint-Denis',
  }, {
    iso_name: 'Romania', iso_code2: 'RO', iso_code3: 'ROU', capital: 'Bucharest',
  }, {
    iso_name: 'Russia',
    iso_code2: 'RU',
    iso_code3: 'RUS',
    capital: 'Moscow',
  }, {
    iso_name: 'Rwanda',
    iso_code2: 'RW',
    iso_code3: 'RWA',
    capital: 'Kigali',
  }, {
    iso_name: 'Saint Kitts and Nevis',
    iso_code2: 'KN',
    iso_code3: 'KNA',
    capital: 'Basseterre',
  }, {
    iso_name: 'Saint Lucia',
    iso_code2: 'LC',
    iso_code3: 'LCA',
    capital: 'Castries',
  }, {
    iso_name: 'Saint Martin',
    iso_code2: 'MF',
    iso_code3: 'MAF',
    capital: 'Philipsburg',
  }, {
    iso_name: 'Saint Vincent and The Grenadines',
    iso_code2: 'VC',
    iso_code3: 'VCT',
    capital: 'Kingstown',
  }, {
    iso_name: 'Samoa', iso_code2: 'WS', iso_code3: 'WSM', capital: 'Pago Pago',
  }, {
    iso_name: 'San Marino',
    iso_code2: 'SM',
    iso_code3: 'SMR',
    capital: 'San Marino',
  }, {
    iso_name: 'Sao Tome and Principe',
    iso_code2: 'ST',
    iso_code3: 'STP',
    capital: 'S\u00e3o Tom\u00e9',
  }, {
    iso_name: 'Saudi Arabia',
    iso_code2: 'SA',
    iso_code3: 'SAU',
    capital: 'Riyadh',
  }, {
    iso_name: 'Senegal', iso_code2: 'SN', iso_code3: 'SEN', capital: 'Dakar',
  }, {
    iso_name: 'Serbia',
    iso_code2: 'RS',
    iso_code3: 'SRB',
    capital: 'Belgrade',
  }, {
    iso_name: 'Seychelles',
    iso_code2: 'SC',
    iso_code3: 'SYC',
    capital: 'Victoria',
  }, {
    iso_name: 'Sierra Leone',
    iso_code2: 'SL',
    iso_code3: 'SLE',
    capital: 'Freetown',
  }, {
    iso_name: 'Singapore',
    iso_code2: 'SG',
    iso_code3: 'SGP',
    capital: 'Singapore',
  }, {
    iso_name: 'Sint Maarten',
    iso_code2: 'SX',
    iso_code3: 'SXM',
    capital: 'Philipsburg',
  }, {
    iso_name: 'Slovakia (SLOVAK Republic)',
    iso_code2: 'SK',
    iso_code3: 'SVK',
    capital: 'Bratislava',
  }, {
    iso_name: 'Slovenia',
    iso_code2: 'SI',
    iso_code3: 'SVN',
    capital: 'Ljubljana',
  }, {
    iso_name: 'Solomon Islands',
    iso_code2: 'SB',
    iso_code3: 'SLB',
    capital: 'Honiara',
  }, {
    iso_name: 'Somalia',
    iso_code2: 'SO',
    iso_code3: 'SOM',
    capital: 'Mogadishu',
  }, {
    iso_name: 'South Africa',
    iso_code2: 'ZA',
    iso_code3: 'ZAF',
    capital: 'Cape Town',
  }, {
    iso_name: 'South Sudan', iso_code2: 'SS', iso_code3: 'SSD', capital: 'Khartoum',
  }, {
    iso_name: 'Spain',
    iso_code2: 'ES',
    iso_code3: 'ESP',
    capital: 'Madrid',
  }, {
    iso_name: 'Sri Lanka',
    iso_code2: 'LK',
    iso_code3: 'LKA',
    capital: 'Sri Jayawardenepura Kotte',
  }, {
    iso_name: 'St. Pierre and Miquelon',
    iso_code2: 'PM',
    iso_code3: 'SPM',
    capital: 'Saint-Pierre',
  }, {
    iso_name: 'Sudan', iso_code2: 'SD', iso_code3: 'SDN', capital: 'Khartoum',
  }, {
    iso_name: 'Suriname',
    iso_code2: 'SR',
    iso_code3: 'SUR',
    capital: 'Paramaribo',
  }, {
    iso_name: 'Swaziland', iso_code2: 'SZ', iso_code3: 'SWZ', capital: 'Lobamba',
  }, {
    iso_name: 'Sweden',
    iso_code2: 'SE',
    iso_code3: 'SWE',
    capital: 'Stockholm',
  }, {
    iso_name: 'Switzerland',
    iso_code2: 'CH',
    iso_code3: 'CHE',
    capital: 'Bern',
  }, {
    iso_name: 'Syrian Arab Republic',
    iso_code2: 'SY',
    iso_code3: 'SYR',
    capital: 'Damascus',
  }, {
    iso_name: 'Taiwan; Republic of China (ROC)',
    iso_code2: 'TW',
    iso_code3: 'TWN',
    capital: 'Taipei',
  }, {
    iso_name: 'Tajikistan',
    iso_code2: 'TJ',
    iso_code3: 'TJK',
    capital: 'Dushanbe',
  }, {
    iso_name: 'Tanzania United Republic of',
    iso_code2: 'TZ',
    iso_code3: 'TZA',
    capital: 'Dodoma',
  }, {
    iso_name: 'Thailand',
    iso_code2: 'TH',
    iso_code3: 'THA',
    capital: 'Bangkok',
  }, {
    iso_name: 'Timor-leste', iso_code2: 'TL', iso_code3: 'TLS', capital: 'Dili',
  }, {
    iso_name: 'Togo',
    iso_code2: 'TG',
    iso_code3: 'TGO',
    capital: 'Lom\u00e9',
  }, {
    iso_name: 'Tokelau', iso_code2: 'TK', iso_code3: 'TKL', capital: 'Tokelau',
  }, {
    iso_name: 'Tonga',
    iso_code2: 'TO',
    iso_code3: 'TON',
    capital: 'Nuku\u02bbalofa',
  }, {
    iso_name: 'Trinidad and Tobago',
    iso_code2: 'TT',
    iso_code3: 'TTO',
    capital: 'Port of Spain',
  }, {
    iso_name: 'Tunisia', iso_code2: 'TN', iso_code3: 'TUN', capital: 'Tunis',
  }, {
    iso_name: 'Turkey',
    iso_code2: 'TR',
    iso_code3: 'TUR',
    capital: 'Ankara',
  }, {
    iso_name: 'Turkmenistan',
    iso_code2: 'TM',
    iso_code3: 'TKM',
    capital: 'Ashgabat',
  }, {
    iso_name: 'Turks and Caicos Islands',
    iso_code2: 'TC',
    iso_code3: 'TCA',
    capital: 'Cockburn Town',
  }, {
    iso_name: 'Tuvalu', iso_code2: 'TV', iso_code3: 'TUV', capital: 'Funafuti',
  }, {
    iso_name: 'Uganda',
    iso_code2: 'UG',
    iso_code3: 'UGA',
    capital: 'Kampala',
  }, {
    iso_name: 'Ukraine',
    iso_code2: 'UA',
    iso_code3: 'UKR',
    capital: 'Kiev',
  }, {
    iso_name: 'United Arab Emirates',
    iso_code2: 'AE',
    iso_code3: 'ARE',
    capital: 'Abu Dhabi',
  }, {
    iso_name: 'United Kingdom',
    iso_code2: 'GB',
    iso_code3: 'GBR',
    capital: 'London',
  }, {
    iso_name: 'United States',
    iso_code2: 'US',
    iso_code3: 'USA',
    capital: 'Washington D.C.',
  }, {
    iso_name: 'United States Minor Outlying Islands\r\n',
    iso_code2: 'UM',
    iso_code3: 'UMI',
    capital: 'United States Minor Outlying Islands',
  }, {
    iso_name: 'Uruguay',
    iso_code2: 'UY',
    iso_code3: 'URY',
    capital: 'Montevideo',
  }, {
    iso_name: 'Uzbekistan',
    iso_code2: 'UZ',
    iso_code3: 'UZB',
    capital: 'Tashkent',
  }, {
    iso_name: 'Vanuatu',
    iso_code2: 'VU',
    iso_code3: 'VUT',
    capital: 'Port Vila',
  }, {
    iso_name: 'Venezuela', iso_code2: 'VE', iso_code3: 'VEN', capital: 'Caracas',
  }, {
    iso_name: 'Viet Nam',
    iso_code2: 'VN',
    iso_code3: 'VNM',
    capital: 'Hanoi',
  }, {
    iso_name: 'Virgin Islands (BRITISH)',
    iso_code2: 'VG',
    iso_code3: 'VGB',
    capital: 'Road Town',
  }, {
    iso_name: 'Virgin Islands (U.S.)',
    iso_code2: 'VI',
    iso_code3: 'VIR',
    capital: 'Charlotte Amalie',
  }, {
    iso_name: 'Wallis and Futuna Islands',
    iso_code2: 'WF',
    iso_code3: 'WLF',
    capital: 'Mata-Utu',
  }, {
    iso_name: 'Yemen', iso_code2: 'YE', iso_code3: 'YEM', capital: 'Sana\'a',
  }, {
    iso_name: 'Zambia',
    iso_code2: 'ZM',
    iso_code3: 'ZMB',
    capital: 'Lusaka',
  }, {
    iso_name: 'Zimbabwe', iso_code2: 'ZW', iso_code3: 'ZWE', capital: 'Harare',
  }],
  selected: 'GB',
}

export default countries
