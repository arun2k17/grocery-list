import type { GroceryCategory } from '../types';

export const groceryCategories: GroceryCategory[] = [
    {
        id: 'vegetables',
        name: 'Vegetables',
        items: [
            { id: 'tomato', name: 'Tomato' },
            { id: 'onion', name: 'Onion' },
            { id: 'potato', name: 'Potato' },
            { id: 'carrot', name: 'Carrot' },
            { id: 'beans', name: 'Beans' },
            { id: 'brinjal', name: 'Brinjal' },
            { id: 'ladiesfinger', name: "Ladies' Finger" },
            { id: 'drumstick', name: 'Drumstick' },
            { id: 'cabbage', name: 'Cabbage' },
            { id: 'cauliflower', name: 'Cauliflower' },
            { id: 'beetroot', name: 'Beetroot' },
            { id: 'radish', name: 'Radish' },
            { id: 'cucumber', name: 'Cucumber' },
            { id: 'bittergourd', name: 'Bitter Gourd' },
            { id: 'bottlegourd', name: 'Bottle Gourd' },
            { id: 'ridgegourd', name: 'Ridge Gourd' },
            { id: 'snakegourd', name: 'Snake Gourd' },
            { id: 'pumpkin', name: 'Pumpkin' },
            { id: 'greenchilli', name: 'Green Chilli' },
            { id: 'coriander', name: 'Coriander Leaves' },
            { id: 'curry', name: 'Curry Leaves' },
            { id: 'ginger', name: 'Ginger' },
            { id: 'garlic', name: 'Garlic' },
            { id: 'coconutpooja', name: 'Coconut' },
        ]
    },
    {
        id: 'fruits',
        name: 'Fruits',
        items: [
            { id: 'banana', name: 'Banana' },
            { id: 'apple', name: 'Apple' },
            { id: 'orange', name: 'Orange' },
            { id: 'grapes', name: 'Grapes' },
            { id: 'pomegranate', name: 'Pomegranate' },
            { id: 'lemon', name: 'Lemon' },
        ]
    },
    {
        id: 'pulses',
        name: 'Pulses & Lentils',
        items: [
            { id: 'tuvar', name: 'Toor Dal' },
            { id: 'moong', name: 'Moong Dal' },
            { id: 'chana', name: 'Chana Dal' },
            { id: 'urad', name: 'Urad Dal' },
            { id: 'masoor', name: 'Masoor Dal' },
            { id: 'rajma', name: 'Rajma' },
            { id: 'blackchana', name: 'Black Chana' },
            { id: 'greengram', name: 'Green Gram Whole' },
        ]
    },
    {
        id: 'grains',
        name: 'Grains & Cereals',
        items: [
            { id: 'rice', name: 'Rice' },
            { id: 'idlyrice', name: 'Idly Rice' },
            { id: 'wheat', name: 'Wheat' },
            { id: 'rava', name: 'Rava' },
            { id: 'poha', name: 'Poha' },
            { id: 'vermicelli', name: 'Vermicelli' },
            { id: 'cornflour', name: 'Corn Flour' },
            { id: 'maida', name: 'Maida' },
            { id: 'besan', name: 'Chick Pea Flour' },
            { id: 'riceflour', name: 'Rice Flour' },
        ]
    },
    {
        id: 'spices',
        name: 'Spices',
        items: [
            { id: 'turmeric', name: 'Turmeric Powder' },
            { id: 'chilli', name: 'Red Chilli Powder' },
            { id: 'corianderseeds', name: 'Coriander seeds' },
            { id: 'cumin', name: 'Cumin Seeds' },
            { id: 'mustard', name: 'Mustard Seeds' },
            { id: 'fenugreek', name: 'Fenugreek' },
            { id: 'blackpepper', name: 'Black Pepper' },
            { id: 'cardamom', name: 'Cardamom' },
            { id: 'cloves', name: 'Cloves' },
            { id: 'cinnamon', name: 'Cinnamon' },
            { id: 'bayleaf', name: 'Bay Leaf' },
            { id: 'starnise', name: 'Star Anise' },
            { id: 'fennel', name: 'Fennel Seeds' },
            { id: 'asafoetida', name: 'Asafoetida' },
            { id: 'garam', name: 'Garam Masala' },
        ]
    },
    {
        id: 'dairy',
        name: 'Dairy & Milk Products',
        items: [
            { id: 'milk', name: 'Milk' },
            { id: 'curd', name: 'Curd' },
            { id: 'saltedbutter', name: 'Salted Butter' },
            { id: 'unsaltedbutter', name: 'Unsalted Butter' },
            { id: 'paneer', name: 'Paneer' },
            { id: 'cheese', name: 'Cheese' },
            { id: 'cream', name: 'Cream' },
        ]
    },
    {
        id: 'oil',
        name: 'Oil & Ghee',
        items: [
            { id: 'sunflower', name: 'Sunflower Oil' },
            { id: 'coconut', name: 'Coconut Oil' },
            { id: 'sesame', name: 'Sesame Oil' },
            { id: 'groundnut', name: 'Groundnut Oil' },
        ]
    },
    {
        id: 'pooja',
        name: 'Pooja Items',
        items: [
            { id: 'camphor', name: 'Camphor' },
            { id: 'agarbatti', name: 'Agarbatti' },
        ]
    },
    {
        id: 'household',
        name: 'Household Items',
        items: [
            { id: 'salt', name: 'Salt' },
            { id: 'sugar', name: 'Sugar' },
            { id: 'jaggery', name: 'Jaggery' },
            { id: 'tea', name: 'Tea Powder' },
            { id: 'coffee', name: 'Coffee Powder' },
            { id: 'tamarind', name: 'Tamarind' },
            { id: 'peanuts', name: 'Peanuts' },
            { id: 'cashew', name: 'Cashew Nuts' },
            { id: 'raisins', name: 'Raisins' },
            { id: 'detergent', name: 'Detergent' },
            { id: 'soap', name: 'Soap' },
            { id: 'toothpaste', name: 'Toothpaste' },
            { id: 'shampoo', name: 'Shampoo' },
            { id: 'dishsoap', name: 'Dish Soap' },
            { id: 'toilet tissue', name: 'Toilet Tissue' },
            { id: 'paper towels', name: 'Paper Towels' },
        ]
    },
];
