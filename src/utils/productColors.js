export const productColors = {
    // Basic Colors
    "Negro": "#1D1D1F",
    "Blanco": "#F5F5F7",
    "Plata": "#E3E4E5",
    "Oro": "#F9E5C9",
    "Rosa": "#FAD7BD",
    "Azul": "#215E7C",
    "Rojo": "#E11C2A",
    "Amarillo": "#F5E488",
    "Verde": "#364935",
    "Morado": "#D1CDDA",

    // iPhone 17 / Air / 17 Pro
    "Lavanda": "#D6D1E6",
    "Azul Mist": "#A8C4D6",
    "Salvia": "#9CA78F",
    "Grafito": "#484848",
    "Deep Blue": "#2A3855",
    "Silver": "#E3E4E5",
    "Cosmic Orange": "#E66838",

    // iPhone 16 / 15
    "Verde Azulado": "#3E6971",
    "Ultramarino": "#5E6C9D",
    "Titanio Negro": "#1D1D1F",
    "Natural": "#B8B5AB",
    "Desierto": "#C6AD8F",
    "Natural Titanium": "#B8B5AB",
    "Blue Titanium": "#2F384C",
    "White Titanium": "#F2F1ED",
    "Black Titanium": "#181819",
    "Black": "#1D1D1F",
    "Blue": "#A0B4C8",
    "Green": "#E1F8DC",
    "Yellow": "#FBF5D4",
    "Pink": "#FDE0E4",

    // iPhone 14
    "Space Black": "#343434",
    "Deep Purple": "#594F63",
    "Gold": "#F9E5C9",
    "Negro Espacial": "#343434",
    "Morado Oscuro": "#594F63",
    "Medianoche": "#2F353B",
    "Estelar": "#F6F2EF",
    "Púrpura": "#E6DDF2",
    "Midnight": "#2F353B",
    "Starlight": "#F6F2EF",

    // iPhone 13 / 12
    "Grafito": "#52514F",
    "Azul Sierra": "#A6C2CF",
    "Verde Alpino": "#4E5844",
    "Azul Pacífico": "#2D4856",
    "Purple": "#D1CDDA",
    "Red": "#E11C2A",
    "White": "#F9F6EF",

    // Pixel Colors
    "Obsidian": "#191919",
    "Porcelain": "#F2F1EA",
    "Hazel": "#8D918D",
    "Rose": "#EAC6C3",
    "Mint": "#DBEBE1",
    "Bay": "#9BB5CE",
    "Aloe": "#D7E6D7",
    "Charcoal": "#42474D",
    "Snow": "#F8F9FA",
    "Sea": "#ADD8E6",
    "Coral": "#FF7F50", // Approximation
    "Lemongrass": "#E4E6C3", // Pixel 7
    "Stormy Black": "#262626",
    "Cloudy White": "#E8E6E3",
    "Sorta Sunny": "#F5E7B8",
    "Sorta Seafoam": "#D8E6DE",
    "Kinda Coral": "#E8B8AA",
    "Sage": "#6A7B6B",
    "Chalk": "#E6E6E6",

    // Pixel 9 / 10
    "Wintergreen": "#D2E6D8",
    "Peony": "#E8C2CA",
    "Rose Quartz": "#F3D8D9",
    "Jade": "#E6EED6", // Approx
    "Moonstone": "#E3E7E9",
    "Frost": "#F0F4F5",
    "Indigo": "#5760F0", // Adjusted for Pixel 10
    "Berry": "#852655", // Adjusted for Pixel 10
    "Fog": "#DAE0E1",

    // Default Fallback
    "default": "#CCCCCC"
};

export const getColorHex = (colorName) => {
    return productColors[colorName] || productColors[colorName.split(' ')[0]] || productColors['default'];
};
