// Import images
import thumbnailWaffle from './assets/images/image-tiramisu-thumbnail.jpg';
import mobileWaffle from './assets/images/image-waffle-mobile.jpg';
import tabletWaffle from './assets/images/image-waffle-tablet.jpg';
import desktopWaffle from './assets/images/image-waffle-desktop.jpg';

import thumbnailCremeBrulee from './assets/images/image-creme-brulee-thumbnail.jpg';
import mobileCremeBrulee from './assets/images/image-creme-brulee-mobile.jpg';
import tabletCremeBrulee from './assets/images/image-creme-brulee-tablet.jpg';
import desktopCremeBrulee from './assets/images/image-creme-brulee-desktop.jpg';

import thumbnailMacaron from './assets/images/image-macaron-thumbnail.jpg';
import mobileMacaron from './assets/images/image-macaron-mobile.jpg';
import tabletMacaron from './assets/images/image-macaron-tablet.jpg';
import desktopMacaron from './assets/images/image-macaron-desktop.jpg';

import thumbnailTiramisu from './assets/images/image-tiramisu-thumbnail.jpg';
import mobileTiramisu from './assets/images/image-tiramisu-mobile.jpg';
import tabletTiramisu from './assets/images/image-tiramisu-tablet.jpg';
import desktopTiramisu from './assets/images/image-tiramisu-desktop.jpg';

import thumbnailBaklava from './assets/images/image-baklava-thumbnail.jpg';
import mobileBaklava from './assets/images/image-baklava-mobile.jpg';
import tabletBaklava from './assets/images/image-baklava-tablet.jpg';
import desktopBaklava from './assets/images/image-baklava-desktop.jpg';

import thumbnailMeringue from './assets/images/image-meringue-thumbnail.jpg';
import mobileMeringue from './assets/images/image-meringue-mobile.jpg';
import tabletMeringue from './assets/images/image-meringue-tablet.jpg';
import desktopMeringue from './assets/images/image-meringue-desktop.jpg';

import thumbnailCake from './assets/images/image-cake-thumbnail.jpg';
import mobileCake from './assets/images/image-cake-mobile.jpg';
import tabletCake from './assets/images/image-cake-tablet.jpg';
import desktopCake from './assets/images/image-cake-desktop.jpg';

import thumbnailBrownie from './assets/images/image-brownie-thumbnail.jpg';
import mobileBrownie from './assets/images/image-brownie-mobile.jpg';
import tabletBrownie from './assets/images/image-brownie-tablet.jpg';
import desktopBrownie from './assets/images/image-brownie-desktop.jpg';

import thumbnailPannaCotta from './assets/images/image-panna-cotta-thumbnail.jpg';
import mobilePannaCotta from './assets/images/image-panna-cotta-mobile.jpg';
import tabletPannaCotta from './assets/images/image-panna-cotta-tablet.jpg';
import desktopPannaCotta from './assets/images/image-panna-cotta-desktop.jpg';


// Define the interface for the image object
interface Image {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
}

// Define the interface for the dessert item
export interface DessertItem {
    image: Image;
    name: string;
    category: string;
    price: number;
    isAdd: boolean;
    id: number;
    quantity?: number
}

// Your JSON data
export const dessertData: DessertItem[] = [
    {
        "image": {
            "thumbnail": thumbnailWaffle,
            "mobile": mobileWaffle,
            "tablet": tabletWaffle,
            "desktop": desktopWaffle
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50,
        "isAdd": false,
        id: 1
    },
    {
        "image": {
            "thumbnail": thumbnailCremeBrulee,
            "mobile": mobileCremeBrulee,
            "tablet": tabletCremeBrulee,
            "desktop": desktopCremeBrulee
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00,
        "isAdd": false,
        id: 2
    },
    {
        "image": {
            "thumbnail": thumbnailMacaron,
            "mobile": mobileMacaron,
            "tablet": tabletMacaron,
            "desktop": desktopMacaron
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00,
        "isAdd": false,
        id: 3
    },
    {
        "image": {
            "thumbnail": thumbnailTiramisu,
            "mobile": mobileTiramisu,
            "tablet": tabletTiramisu,
            "desktop": desktopTiramisu
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50,
        "isAdd": false,
        id: 4
    },
    {
        "image": {
            "thumbnail": thumbnailBaklava,
            "mobile": mobileBaklava,
            "tablet": tabletBaklava,
            "desktop": desktopBaklava
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00,
        "isAdd": false,
        id: 5
    },
    {
        "image": {
            "thumbnail": thumbnailMeringue,
            "mobile": mobileMeringue,
            "tablet": tabletMeringue,
            "desktop": desktopMeringue
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00,
        "isAdd": false,
        id: 6
    },
    {
        "image": {
            "thumbnail": thumbnailCake,
            "mobile": mobileCake,
            "tablet": tabletCake,
            "desktop": desktopCake
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50,
        "isAdd": false,
        id: 7
    },
    {
        "image": {
            "thumbnail": thumbnailBrownie,
            "mobile": mobileBrownie,
            "tablet": tabletBrownie,
            "desktop": desktopBrownie
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50,
        "isAdd": false,
        id: 8
    },
    {
        "image": {
            "thumbnail": thumbnailPannaCotta,
            "mobile": mobilePannaCotta,
            "tablet": tabletPannaCotta,
            "desktop": desktopPannaCotta
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50,
        "isAdd": false,
        id: 9
    }
];
