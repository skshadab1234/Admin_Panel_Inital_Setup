const DashBoardChartData = [
    {
        id: 2,
        heading: 'Total sales',
        alias: 'Sales Overview',  // Alias added
        slug: 'total-sales',      // Slug added
        content: '0',
        type: 'chart',
    },
    {
        id: 3,
        heading: 'Total orders',
        alias: 'Orders Overview',  // Alias added
        slug: 'total-orders',      // Slug added
        content: '0',
        type: 'linechart3',
        StoreData: [50, 31, 40, 30, 51, 32, 40, 22, 50, 35],
        categories: ['May 27', 'May 29', 'Jun 2', 'Jun 5', 'Jun 8', 'Jun 11', 'Jun 14', 'Jun 18', 'Jun 20', 'Jun 24'],
    },
    {
        id: 5,
        heading: 'Average order value',
        alias: 'AOV Overview',   // Alias added
        slug: 'average-order-value',  // Slug added
        content: '0',
        type: 'linechart5',
        StoreData: [31, 40, 30, 51, 32, 40, 22, 50, 35, 50],
        categories: ['May 27', 'May 30', 'Jun 59', 'Jun 5', 'Jun 8', 'Jun 11', 'Jun 14', 'Jun 18', 'Jun 20', 'Jun 24'],
    },
    {
        id: 6,
        heading: 'Gross sales',
        alias: 'Gross Sales Overview',  // Alias added
        slug: 'gross-sales',            // Slug added
        content: '0',
        type: 'linechart6',
        StoreData: [10, 20, 15, 25, 18],
        categories: ['Intense Pour Homme', 'Tobacco Vanilla', 'Panther', 'Vetiver', 'Nomade'],
    },
    // {
    //     id: 7,
    //     heading: 'Net return value',
    //     alias: 'Net Return Overview',  // Alias added
    //     slug: 'net-return-value',      // Slug added
    //     content: '0',
    //     type: 'linechart7',
    //     StoreData: [50, 31, 40, 30, 51, 32, 40, 22, 50, 35],
    //     categories: ['May 27', 'May 29', 'Jun 2', 'Jun 5', 'Jun 8', 'Jun 11', 'Jun 14', 'Jun 18', 'Jun 20', 'Jun 24'],
    // },
    // {
    //     id: 9,
    //     heading: 'Return rate',
    //     alias: 'Return Rate Overview',  // Alias added
    //     slug: 'return-rate',            // Slug added
    //     content: '0',
    //     type: 'linechart9',
    //     StoreData: [31, 40, 30, 51, 32, 40, 22, 50, 35, 50],
    //     categories: ['May 27', 'May 30', 'Jun 2', 'Jun 5', 'Jun 8', 'Jun 11', 'Jun 14', 'Jun 18', 'Jun 20', 'Jun 24'],
    // },
    // {
    //     id: 10,
    //     heading: 'Returning customer rate',
    //     alias: 'Returning Customer Overview',  // Alias added
    //     slug: 'returning-customer-rate',       // Slug added
    //     content: '0',
    //     type: 'linechart10',
    //     StoreData: [10, 20, 15, 25, 18],
    //     categories: ['Intense Pour Homme', 'Tobacco Vanilla', 'Panther', 'Vetiver', 'Nomade'],
    // },
    // {
    //     id: 11,
    //     heading: 'Returns',
    //     alias: 'Returns Overview',  // Alias added
    //     slug: 'returns',            // Slug added
    //     content: '0',
    //     type: 'linechart11',
    //     StoreData: [50, 31, 40, 30, 51, 32, 40, 22, 50, 35],
    //     categories: ['May 27', 'May 29', 'Jun 2', 'Jun 5', 'Jun 8', 'Jun 11', 'Jun 14', 'Jun 18', 'Jun 20', 'Jun 24'],
    // },
    // {
    //     id: 12,
    //     heading: 'Total sales breakdown',
    //     alias: 'Sales Breakdown Overview',  // Alias added
    //     slug: 'total-sales-breakdown',      // Slug added
    //     content: '0',
    //     type: 'linechart12',
    //     StoreData: [40, 30, 51, 32, 40, 22, 50, 35, 31, 0],
    //     categories: ['May 27', 'May 28', 'Jun 2', 'Jun 5', 'Jun 8', 'Jun 11', 'Jun 14', 'Jun 18', 'Jun 20', 'Jun 24'],
    // },
];

export default DashBoardChartData;
