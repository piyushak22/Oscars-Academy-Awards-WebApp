const express = require('express');
const data = require('./oscars.json');
const path = require('path');

const app = express();

app.use(express.static('public'));

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/nominations', (req, res) => {

    let results = data;

    try {
        // Filtering based on 'year' query parameter
        if (req.query.year) {
            results = results.filter(item => item.Year.includes(req.query.year));
        }

        // Filtering based on 'category' query parameter
        if (req.query.category) {
            const categoryQuery = req.query.category.toLowerCase();
            results = results.filter(item => item.Category.toLowerCase().includes(categoryQuery));
        }
    
        // Filtering based on 'nominee/info' query parameter
        if (req.query.nomInfo) {
            const nomInfoQueryLower = req.query.nomInfo.toLowerCase();
            results = results.filter(item => {
                const nominee = item.Nominee ? item.Nominee.toLowerCase() : '';
                const info = item.Info && typeof item.Info === 'string' ? item.Info.toLowerCase() : '';
                return nominee.includes(nomInfoQueryLower) || info.includes(nomInfoQueryLower);
            });
        } else {
            // These filters should only be considered if nomInfo is not provided
            if (req.query.nominee) {
                const nomineeQueryLower = req.query.nominee.toLowerCase();
                results = results.filter(item => item.Nominee.toLowerCase().includes(nomineeQueryLower));
            }

            if (req.query.info) {
                const infoQueryLower = req.query.info.toLowerCase();
                results = results.filter(item => {
                    return typeof item.Info === 'string' && item.Info.toLowerCase().includes(infoQueryLower);
                });
            }
        }

        // Filtering based on Won status if provided
        if (req.query.won) {
            const wonQuery = req.query.won.toLowerCase();
            // Assuming the data has a 'Won' field that is either 'yes' or 'no'
            results = results.filter(item => item.Won.toLowerCase() === wonQuery);
        }

        res.json(results);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/nominees', (req, res) => {
    
    let filteredData = data;

    try {
        // Filtering based on 'year' query parameter
        if (req.query.year) {
            filteredData = filteredData.filter(item => item.Year.includes(req.query.year));
        }
        
        // Filtering based on 'category' query parameter
        if (req.query.category) {
            const categoryQuery = req.query.category.toLowerCase().trim();
            filteredData = filteredData.filter(item => item.Category.toLowerCase().includes(categoryQuery));
        }
        
        // Filter based on the 'nominee' query parameter
        if (req.query.nominee) {
            const nomineeQuery = req.query.nominee.toLowerCase();
            filteredData = filteredData.filter(item => item.Nominee && item.Nominee.toLowerCase().includes(nomineeQuery));
        }
    
        // Filter based on the 'info' query parameter
        if (req.query.info) {
            const infoQuery = req.query.info.toLowerCase();
            filteredData = filteredData.filter(item => {
                if (typeof item.Info !== 'string') {
                    return false;
                }
                return item.Info.toLowerCase().includes(infoQuery);
            });
        }
        
        // Filter based on 'nomInfo' which could match either Nominee or Info
        if (req.query.nomInfo) {
            const nomInfoQuery = req.query.nomInfo.toLowerCase();
            filteredData = filteredData.filter(item =>
                (item.Nominee && typeof item.Nominee === 'string' && item.Nominee.toLowerCase().includes(nomInfoQuery)) ||
                (item.Info && typeof item.Info === 'string' && item.Info.toLowerCase().includes(nomInfoQuery))
            );
        }        
    
        // Filter based on wonOption if provided
        if (req.query.won && req.query.won !== "") {
            const wonQuery = req.query.won.toLowerCase();
            filteredData = filteredData.filter(item => item.Won && item.Won.toLowerCase() === wonQuery);
            console.log(`Filtered data count after won filter: ${filteredData.length}`);
        }
    
        let nomineeCounts = {};
    
        // Count nominations for all nominees initially
        filteredData.forEach(item => {
            nomineeCounts[item.Nominee] = nomineeCounts[item.Nominee] + 1 || 1;
        });
    
        // Sort nominees by count, descending order
        let sortedNominees = Object.keys(nomineeCounts).map(nominee => {
            return { nominee, count: nomineeCounts[nominee] };
        }).sort((a, b) => b.count - a.count); 
    
        // If numberOfTimes is provided, filter the sortedNominees to provide records equal or greater than the number
        if (req.query.numberOfTimes) {
            const numberOfTimes = parseInt(req.query.numberOfTimes);
            sortedNominees = sortedNominees.filter(nominee => nominee.count >= numberOfTimes);
        }
        res.json(sortedNominees)
    
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Internal Server Error');
    }
}); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'iwt-cw.html'));
});

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
