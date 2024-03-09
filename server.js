const fs = require('fs');
const express = require('express');
const data = require('./oscars.json');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/nominations', (req, res) => {
    let results = data;

    console.log('Query Params:', req.query);
    try {
        if (req.query.year) {
            results = results.filter(item => item.Year.includes(req.query.year));
            // console.log('After year filter: ', results.length);
        }
    
        if (req.query.category) {
            const categoryQuery = req.query.category.toLowerCase();
            results = results.filter(item => item.Category.toLowerCase().includes(categoryQuery));
            // console.log('After category filter: ', results.length);
        }
    
        if (req.query.nominee) {
            results = results.filter(item => item.Nominee.toLowerCase().includes(req.query.nominee.toLowerCase()));
            // console.log('After nominee filter: -----------------------------', results.length);
        }
    
        if (req.query.info) {
            const infoQueryLower = req.query.info.toLowerCase();

            results = results.filter(item => {
                // Check if item.Info exists and is a string before calling toLowerCase
                if (typeof item.Info === 'string' || item.Info instanceof String) {
                    return item.Info.toLowerCase().includes(infoQueryLower);
                }
                // Optionally handle the case where item.Info is not a string
                // For example, you might want to return false to exclude this item
                return false;
            });
            console.log('After info filter : ----------------------------------', results.length)
        }
    
        res.json(results);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/nominees', (req, res) => {
    let nomineeCounts = {};
    let filteredData = data;
    // Count nominations for all nominees initially
    filteredData.forEach(item => {
        nomineeCounts[item.Nominee] = nomineeCounts[item.Nominee] + 1 || 1;
    });

    // Filter based on wonOption if provided
    // if (req.query.wonOption) {
    //     const wonOption = req.query.wonOption.toLowerCase();
    //     filteredData = filteredData.filter(item => {
    //         const won = item.Won.toLowerCase();
    //         return wonOption === 'all' || (wonOption === 'won' && won === 'yes') || (wonOption === 'notwon' && won === 'no');
    //     });
    // }

    let sortedNominees = Object.keys(nomineeCounts).map(nominee => {
        return { nominee, count: nomineeCounts[nominee] };
    }).sort((a, b) => b.count - a.count); // Sort nominees by count, descending

    // If numberOfTimes is provided, filter the sortedNominees to match the count
    if (req.query.numberOfTimes) {
        const numberOfTimes = parseInt(req.query.numberOfTimes);
        sortedNominees = sortedNominees.filter(nominee => nominee.count === numberOfTimes);
    }

    res.json(sortedNominees)
    // If numberOfTimes is provided, change the response structure to return only nominee names
    // if (req.query.numberOfTimes) {
    //     res.json(sortedNominees.map(nominee => nominee.nominee));
    // } else {
    //     // If numberOfTimes is not provided, return the full details
    //     res.json(sortedNominees);
    // }


}); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'iwt-cw.html'));
});

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});

