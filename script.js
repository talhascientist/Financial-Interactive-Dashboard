document.addEventListener('DOMContentLoaded', function () {
    // API Configuration
    const API_KEY = document.getElementById('apiKey').textContent;
    const BASE_URL = 'https://financialdata.net/api/v1';
    
    // API Category Data Structure
    const apiCategories = {
        'stock-symbols': {
            name: 'Stock Symbols',
            endpoint: '/stock-symbols',
            description: 'Get a list of stock symbols for publicly traded US and international companies. The list contains thousands of trading symbols as well as the names of the companies whose shares they identify.',
            params: [
                { name: 'offset', type: 'integer', description: '(Optional) The initial position of the record subset, which indicates how many records to skip. Defaults to 0.', example: '500' },
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: 500,
            chartable: false,
            sampleResponse: [
                { trading_symbol: 'A', registrant_name: 'AGILENT TECHNOLOGIES, INC.' },
                { trading_symbol: 'AA', registrant_name: 'Alcoa Corp' },
                { trading_symbol: 'AACB', registrant_name: 'Artius II Acquisition Inc.' }
            ]
        },
        'etf-symbols': {
            name: 'ETF Symbols',
            endpoint: '/etf-symbols',
            description: 'An exchange-traded fund (ETF) is a type of investment fund that trades on the stock exchange. ETFs own financial assets such as stocks, bonds, currencies, futures contracts, or commodities. Our API can provide you with a list of a few thousand ETF trading symbols, together with their descriptions.',
            params: [
                { name: 'offset', type: 'integer', description: '(Optional) The initial position of the record subset, which indicates how many records to skip. Defaults to 0.', example: '500' },
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: 500,
            chartable: false,
            sampleResponse: [
                { trading_symbol: 'AAA', description: 'AAF First Priority CLO Bond ETF' },
                { trading_symbol: 'AADR', description: 'AdvisorShares Dorsey Wright ADR ETF' },
                { trading_symbol: 'AALL', description: 'GraniteShares 2x Long AAL Daily ETF' }
            ]
        },
        'mutual-fund-symbols': {
            name: 'Mutual Fund Symbols',
            endpoint: '/mutual-fund-symbols',
            description: 'A mutual fund is an investment fund that pools money from multiple investors to buy securities. Mutual funds are not traded on stock exchanges but can be purchased and sold through brokerage firms or fund companies. This API endpoint returns a few thousand fund symbols, along with additional information.',
            params: [
                { name: 'offset', type: 'integer', description: '(Optional) The initial position of the record subset, which indicates how many records to skip. Defaults to 0.', example: '500' },
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: 500,
            chartable: false,
            sampleResponse: [
                { trading_symbol: 'AAAAX', fund_name: 'DWS RREEF Real Assets Fund, Class A' },
                { trading_symbol: 'AAAEX', fund_name: 'Virtus KAR Health Sciences Fund, P' },
                { trading_symbol: 'AAAIX', fund_name: 'STRATEGIC ALLOCATION: AGGRESSIVE FUND, I CLASS' }
            ]
        },
        'commodity-symbols': {
            name: 'Commodity Symbols',
            endpoint: '/commodity-symbols',
            description: 'The commodity market covers the trading of raw materials like oil, gold, coffee, etc. This API endpoint provides trading symbols and additional information for major commodities.',
            params: [
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: null,
            chartable: false,
            sampleResponse: [
                { trading_symbol: 'BZ:NMX', description: 'Brent Crude Oil Futures (NYMEX)' },
                { trading_symbol: 'CJ:NMX', description: 'Cocoa Futures (NYMEX)' },
                { trading_symbol: 'CL:NMX', description: 'Crude Oil Futures (NYMEX)' }
            ]
        },
        'otc-symbols': {
            name: 'OTC Symbols',
            endpoint: '/otc-symbols',
            description: 'The over-the-counter (OTC) market is where securities are traded through a network of brokers and dealers rather than on a centralized exchange. OTC stocks typically indicate ownership of equity in smaller companies that do not meet the requirements for regular listings. Our API gives you access to thousands of OTC symbols and additional information about them.',
            params: [
                { name: 'offset', type: 'integer', description: '(Optional) The initial position of the record subset, which indicates how many records to skip. Defaults to 0.', example: '500' },
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: 500,
            chartable: false,
            sampleResponse: [
                { trading_symbol: 'AAALY', title_of_security: 'Aareal Bank AG Unsponsored American Depository Receipt (Germany)' },
                { trading_symbol: 'AABB', title_of_security: 'Asia Broadband Inc Common Stock' },
                { trading_symbol: 'AABVF', title_of_security: 'Aberdeen International Inc Ordinary Shares' }
            ]
        },
        'stock-prices': {
            name: 'Stock Prices',
            endpoint: '/stock-prices',
            description: 'The API endpoint provides more than 10 years of daily historical stock prices and volumes. The data covers several thousand US and international companies.',
            params: [
                { name: 'identifier', type: 'string', description: 'The trading symbol for a security.', example: 'MSFT', required: true },
                { name: 'offset', type: 'integer', description: '(Optional) The initial position of the record subset, which indicates how many records to skip. Defaults to 0.', example: '300' },
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: 300,
            chartable: true,
            chartType: 'line',
            chartConfig: {
                xKey: 'date',
                yKey: 'close',
                label: 'Close Price'
            },
            sampleResponse: [
                { trading_symbol: 'MSFT', date: '2024-12-04', open: 433.03, high: 439.67, low: 432.63, close: 437.42, volume: 26009430.0 },
                { trading_symbol: 'MSFT', date: '2024-12-03', open: 429.84, high: 432.47, low: 427.74, close: 431.2, volume: 18301990.0 }
            ]
        },
        'etf-prices': {
            name: 'ETF Prices',
            endpoint: '/etf-prices',
            description: 'An exchange-traded fund (ETF) is a type of investment fund that trades on the stock exchange. ETFs own financial assets such as stocks, bonds, currencies, futures contracts, or commodities. Our API provides more than 10 years of end-of-day historical prices and volumes for major exchange-traded funds.',
            params: [
                { name: 'identifier', type: 'string', description: 'The trading symbol for an ETF.', example: 'SPY', required: true },
                { name: 'offset', type: 'integer', description: '(Optional) The initial position of the record subset, which indicates how many records to skip. Defaults to 0.', example: '300' },
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: 300,
            chartable: true,
            chartType: 'line',
            chartConfig: {
                xKey: 'date',
                yKey: 'close',
                label: 'Close Price'
            },
            sampleResponse: [
                { trading_symbol: 'SPY', date: '2024-12-03', open: 603.39, high: 604.16, low: 602.341, close: 603.91, volume: 26906630.0 },
                { trading_symbol: 'SPY', date: '2024-12-02', open: 602.97, high: 604.32, low: 602.47, close: 603.63, volume: 31745990.0 }
            ]
        },
        'commodity-prices': {
            name: 'Commodity Prices',
            endpoint: '/commodity-prices',
            description: 'The commodity market comprises the trading of raw materials such as oil, gold, coffee, etc. Our API offers over ten years of end-of-day historical prices and volumes for major commodities.',
            params: [
                { name: 'identifier', type: 'string', description: 'The trading symbol for a commodity.', example: 'ZC', required: true },
                { name: 'offset', type: 'integer', description: '(Optional) The initial position of the record subset, which indicates how many records to skip. Defaults to 0.', example: '300' },
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: 300,
            chartable: true,
            chartType: 'line',
            chartConfig: {
                xKey: 'date',
                yKey: 'close',
                label: 'Close Price'
            },
            sampleResponse: [
                { trading_symbol: 'ZC', date: '2024-12-03', open: 425.0, high: 428.0, low: 422.75, close: 423.25, volume: 4078.0 },
                { trading_symbol: 'ZC', date: '2024-12-02', open: 423.0, high: 425.5, low: 420.75, close: 424.5, volume: 3877.0 }
            ]
        },
        'otc-prices': {
            name: 'OTC Prices',
            endpoint: '/otc-prices',
            description: 'The over-the-counter (OTC) market is a market in which securities are traded through a network of brokers and dealers rather than on a centralized exchange. OTC stocks often represent ownership of equity in smaller companies that do not meet the requirements for regular listings. The API endpoint provides over ten years of daily historical prices and volumes for more than 10,000 OTC securities.',
            params: [
                { name: 'identifier', type: 'string', description: 'The trading symbol for a security.', example: 'AABB', required: true },
                { name: 'offset', type: 'integer', description: '(Optional) The initial position of the record subset, which indicates how many records to skip. Defaults to 0.', example: '300' },
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: 300,
            chartable: true,
            chartType: 'line',
            chartConfig: {
                xKey: 'date',
                yKey: 'close',
                label: 'Close Price'
            },
            sampleResponse: [
                { trading_symbol: 'AABB', date: '2024-12-04', open: 0.0271, high: 0.0271, low: 0.024, close: 0.0248, volume: 6592169.0 },
                { trading_symbol: 'AABB', date: '2024-12-03', open: 0.0235, high: 0.029, low: 0.0235, close: 0.0265, volume: 6828867.0 }
            ]
        },
        'company-info': {
            name: 'Company Information',
            endpoint: '/company-information',
            description: 'This API endpoint provides basic information about the company, such as its LEI number, industry, contact information, and other key facts. The data covers a few thousand US and international companies.',
            params: [
                { name: 'identifier', type: 'string', description: 'The trading symbol for a security, or the central index key (CIK). The latter is assigned to the entity by the United States Securities and Exchange Commission.', example: 'MSFT, 0000789019', required: true },
                { name: 'format', type: 'string', description: '(Optional) The format of the returned data, either JSON (JavaScript Object Notation) or CSV (Comma Separated Values). Defaults to JSON.', example: 'json, csv' }
            ],
            recordLimit: null,
            chartable: false,
            sampleResponse: [
                {
                    trading_symbol: 'MSFT',
                    central_index_key: '0000789019',
                    registrant_name: 'MICROSOFT CORP',
                    industry: 'Information technology',
                    founding_date: '1975-04-04',
                    chief_executive_officer: 'Satya Nadella',
                    number_of_employees: 228000,
                    website: 'https://www.microsoft.com/',
                    market_cap: 2800000000000.0
                }
            ]
        }
    };
    
    let activeCategory = 'stock-symbols';
    let currentChart = null;
    let lastFetchedData = null;
    
    // DOM Elements
    const categoryItems = document.querySelectorAll('.sidebar-nav ul li');
    const currentCategoryEl = document.getElementById('currentCategory');
    const endpointUrlEl = document.getElementById('endpointUrl');
    const paramInputsEl = document.getElementById('paramInputs');
    const formatSelectorEl = document.getElementById('formatSelector');
    const fetchDataBtn = document.getElementById('fetchDataBtn');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const dataDisplay = document.getElementById('dataDisplay');
    const chartCanvas = document.getElementById('dataChart');
    const categoryInfoEl = document.getElementById('categoryInfo');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const apiResponseModal = document.getElementById('apiResponseModal');
    const responseStatus = document.getElementById('responseStatus');
    const responseTime = document.getElementById('responseTime');
    const responseData = document.getElementById('responseData');
    const copyApiKeyBtn = document.getElementById('copyApiKey');
    const copyEndpointBtn = document.getElementById('copyEndpoint');
    const copyResponseBtn = document.getElementById('copyResponse');
    const downloadResponseBtn = document.getElementById('downloadResponse');
    const closeModalBtn = document.getElementById('closeModal');
    
    // Initialize
    init();    function init() {
        // Add animation classes to elements
        addAnimations();
        
        // Set up event listeners
        categoryItems.forEach(item => {
            item.addEventListener('click', handleCategoryChange);
        });
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', handleTabChange);
        });
        
        fetchDataBtn.addEventListener('click', fetchData);
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keyup', e => {
            if (e.key === 'Enter') handleSearch();
        });
        
        copyApiKeyBtn.addEventListener('click', () => copyToClipboard(document.getElementById('apiKey').textContent, 'API key'));
        copyEndpointBtn.addEventListener('click', () => copyToClipboard(endpointUrlEl.textContent, 'Endpoint URL'));
        copyResponseBtn.addEventListener('click', () => copyToClipboard(responseData.textContent, 'API response'));
        downloadResponseBtn.addEventListener('click', downloadResponse);
        closeModalBtn.addEventListener('click', () => {
            apiResponseModal.classList.add('animate__animated', 'animate__zoomOut');
            setTimeout(() => {
                apiResponseModal.style.display = 'none';
                apiResponseModal.classList.remove('animate__animated', 'animate__zoomOut');
            }, 500);
        });
        
        // Window events
        window.addEventListener('click', e => {
            if (e.target === apiResponseModal) {
                apiResponseModal.classList.add('animate__animated', 'animate__zoomOut');
                setTimeout(() => {
                    apiResponseModal.style.display = 'none';
                    apiResponseModal.classList.remove('animate__animated', 'animate__zoomOut');
                }, 500);
            }
        });
        
        // Initialize with default category
        updateCategory('stock-symbols');
        
        // Initialize market ticker animation
        initMarketTicker();
    }
    
    function addAnimations() {
        // Add animation to sidebar items
        document.querySelectorAll('.sidebar-nav ul li').forEach((item, index) => {
            item.classList.add('animate__animated', 'animate__fadeInLeft');
            item.style.animationDelay = `${0.1 * index}s`;
        });
        
        // Add animations to usage metrics
        document.querySelectorAll('.usage-metric').forEach((metric, index) => {
            metric.classList.add('animate__animated', 'animate__fadeInUp');
            metric.style.animationDelay = `${0.2 + (0.1 * index)}s`;
        });
        
        // Add pulse animation to fetch button
        fetchDataBtn.classList.add('pulse-animation');
    }
    
    function initMarketTicker() {
        // Simulate real-time updates for the market ticker
        setInterval(() => {
            document.querySelectorAll('.ticker-item').forEach(ticker => {
                const priceEl = ticker.querySelector('.ticker-price');
                const changeEl = ticker.querySelector('.ticker-change');
                
                // Current price
                const currentPrice = parseFloat(priceEl.textContent.replace(/,/g, ''));
                
                // Generate random price change (-0.2% to +0.2%)
                const changePercent = (Math.random() * 0.4 - 0.2).toFixed(2);
                const newPrice = currentPrice * (1 + parseFloat(changePercent) / 100);
                
                // Update UI
                priceEl.textContent = newPrice.toFixed(2);
                
                // Get current change
                let currentChange = parseFloat(changeEl.textContent);
                if (isNaN(currentChange)) {
                    currentChange = parseFloat(changeEl.textContent.replace(/[+%]/g, ''));
                }
                
                // Add the new change
                const newChange = (currentChange + parseFloat(changePercent)).toFixed(2);
                
                changeEl.textContent = `${newChange >= 0 ? '+' : ''}${newChange}%`;
                
                // Update classes
                if (newChange >= 0) {
                    priceEl.classList.remove('down');
                    changeEl.classList.remove('down');
                    priceEl.classList.add('up');
                    changeEl.classList.add('up');
                } else {
                    priceEl.classList.remove('up');
                    changeEl.classList.remove('up');
                    priceEl.classList.add('down');
                    changeEl.classList.add('down');
                }
            });
        }, 5000); // Update every 5 seconds
    }
    
    function handleCategoryChange(e) {
        const categoryId = e.currentTarget.getAttribute('data-category');
        
        // Update active class with animation
        categoryItems.forEach(item => {
            if (item.getAttribute('data-category') === categoryId) {
                item.classList.add('active');
                item.classList.add('animate__animated', 'animate__pulse');
                setTimeout(() => {
                    item.classList.remove('animate__animated', 'animate__pulse');
                }, 500);
            } else {
                item.classList.remove('active');
            }
        });
        
        updateCategory(categoryId);
    }
    
    function handleTabChange(e) {
        const tabId = e.currentTarget.getAttribute('data-tab');
        
        // Update active tab button
        tabBtns.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Update active tab pane with fade animation
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
            pane.style.display = 'none';
        });
        
        const activePane = document.getElementById(`${tabId}Tab`);
        activePane.style.display = 'block';
        
        // Force reflow for animation
        void activePane.offsetWidth;
        
        activePane.classList.add('active');
        
        // If switching to chart tab and we have data, render chart
        if (tabId === 'chart' && lastFetchedData && activeCategory && apiCategories[activeCategory].chartable) {
            renderChart(lastFetchedData);
        }
    }
    
    function updateCategory(categoryId) {
        activeCategory = categoryId;
        const category = apiCategories[categoryId];
        
        // Update UI with animation
        currentCategoryEl.textContent = category.name;
        currentCategoryEl.classList.add('animate__animated', 'animate__fadeIn');
        setTimeout(() => {
            currentCategoryEl.classList.remove('animate__animated', 'animate__fadeIn');
        }, 500);
        
        updateEndpointUrl();
        generateParamInputs();
        updateCategoryInfo();
        
        // Reset data display with animation
        dataDisplay.innerHTML = `
            <div class="loading-placeholder animate__animated animate__fadeIn">
                <i class="fas fa-database data-icon animate-float"></i>
                <p>Select a data category and click "Get Data" to see results.</p>
            </div>
        `;
        
        // Clear chart if exists
        if (currentChart) {
            currentChart.destroy();
            currentChart = null;
        }
        
        document.querySelector('.chart-placeholder').style.display = category.chartable ? 'none' : 'flex';
        
        // Reset last fetched data
        lastFetchedData = null;
    }
    
    function updateEndpointUrl() {
        const category = apiCategories[activeCategory];
        const baseEndpoint = `${BASE_URL}${category.endpoint}`;
        
        // Check if identifier is required
        const identifierParam = category.params.find(p => p.name === 'identifier');
        const hasIdentifier = identifierParam && identifierParam.required;
        
        let url = baseEndpoint;
        if (hasIdentifier) {
            url += `?identifier=${identifierParam.example.split(',')[0]}`;
        }
        
        url += `${hasIdentifier ? '&' : '?'}key=YOUR_API_KEY`;
        
        endpointUrlEl.textContent = url;
        endpointUrlEl.classList.add('animate__animated', 'animate__fadeIn');
        setTimeout(() => {
            endpointUrlEl.classList.remove('animate__animated', 'animate__fadeIn');
        }, 500);
    }
    
    function generateParamInputs() {
        paramInputsEl.innerHTML = '';
        const category = apiCategories[activeCategory];
        
        category.params.forEach((param, index) => {
            const paramGroup = document.createElement('div');
            paramGroup.className = 'param-group animate__animated animate__fadeInUp';
            paramGroup.style.animationDelay = `${0.1 * index}s`;
            
            const label = document.createElement('label');
            label.setAttribute('for', `param-${param.name}`);
            label.innerHTML = `${param.name}${param.required ? ' <span class="required">*</span>' : ''}`;
            
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('id', `param-${param.name}`);
            input.setAttribute('name', param.name);
            input.setAttribute('placeholder', param.example);
            
            if (param.required) {
                input.setAttribute('required', 'required');
                input.value = param.example.split(',')[0];
            }
            
            const description = document.createElement('div');
            description.className = 'param-description';
            description.textContent = param.description;
            
            paramGroup.appendChild(label);
            paramGroup.appendChild(input);
            paramGroup.appendChild(description);
            
            paramInputsEl.appendChild(paramGroup);
        });
    }
    
    function updateCategoryInfo() {
        const category = apiCategories[activeCategory];
        
        let html = `
            <h3 class="animate__animated animate__fadeIn">${category.name}</h3>
            <p class="animate__animated animate__fadeIn" style="animation-delay: 0.1s">${category.description}</p>
        `;
        
        if (category.recordLimit) {
            html += `<p class="animate__animated animate__fadeIn" style="animation-delay: 0.2s"><strong>Record Limit:</strong> ${category.recordLimit} records per API call</p>`;
        }
        
        html += `
            <div class="parameter-info animate__animated animate__fadeIn" style="animation-delay: 0.3s">
                <h4>Parameters:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        category.params.forEach(param => {
            html += `
                <tr>
                    <td>${param.name}${param.required ? ' <span class="required">*</span>' : ''}</td>
                    <td>${param.type}</td>
                    <td>${param.description}</td>
                    <td><code>${param.example}</code></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
            
            <div class="sample-response animate__animated animate__fadeIn" style="animation-delay: 0.4s">
                <h4>Sample Response:</h4>
                <pre>${JSON.stringify(category.sampleResponse, null, 2)}</pre>
            </div>
        `;
        
        categoryInfoEl.innerHTML = html;
    }
    
    function handleSearch() {
        const searchValue = searchInput.value.trim();
        if (!searchValue) return;
        
        // Add animation to search input
        searchInput.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            searchInput.classList.remove('animate__animated', 'animate__pulse');
        }, 500);
        
        // Find categories that need an identifier
        const priceCategories = ['stock-prices', 'etf-prices', 'commodity-prices', 'otc-prices', 'company-info'];
        
        // Set the first price category as active
        const targetCategory = priceCategories[0];
        
        // Update active category in sidebar with animation
        categoryItems.forEach(item => {
            if (item.getAttribute('data-category') === targetCategory) {
                item.classList.add('active', 'animate__animated', 'animate__pulse');
                setTimeout(() => {
                    item.classList.remove('animate__animated', 'animate__pulse');
                }, 500);
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update category
        updateCategory(targetCategory);
        
        // Set the search value as identifier
        const identifierInput = document.getElementById('param-identifier');
        if (identifierInput) {
            identifierInput.value = searchValue;
            identifierInput.classList.add('animate__animated', 'animate__pulse');
            setTimeout(() => {
                identifierInput.classList.remove('animate__animated', 'animate__pulse');
            }, 500);
        }
        
        // Fetch data automatically with a slight delay for visual effect
        setTimeout(() => {
            fetchData();
        }, 300);
    }
    
    async function fetchData() {
        const category = apiCategories[activeCategory];
        let endpointUrl = `${BASE_URL}${category.endpoint}`;
        const params = new URLSearchParams();
        
        // Add API key
        params.append('key', API_KEY);
        
        // Add format
        params.append('format', formatSelectorEl.value);
        
        // Animate fetch button
        fetchDataBtn.classList.add('animate__animated', 'animate__pulse');
        
        // Get params from inputs
        const paramInputs = paramInputsEl.querySelectorAll('input');
        let isValid = true;
        
        paramInputs.forEach(input => {
            const paramName = input.name;
            const paramValue = input.value.trim();
            
            // Check if required param is missing
            if (input.hasAttribute('required') && !paramValue) {
                input.classList.add('error', 'animate__animated', 'animate__shakeX');
                setTimeout(() => {
                    input.classList.remove('animate__animated', 'animate__shakeX');
                }, 500);
                isValid = false;
                return;
            }
            
            input.classList.remove('error');
            
            if (paramValue) {
                params.append(paramName, paramValue);
            }
        });
        
        if (!isValid) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }
        
        // Update UI to show loading
        dataDisplay.innerHTML = `
            <div class="loading-placeholder animate__animated animate__fadeIn">
                <div class="loader"></div>
                <p>Loading data...</p>
            </div>
        `;
        
        // Clear chart if exists
        if (currentChart) {
            currentChart.destroy();
            currentChart = null;
        }
        
        const startTime = Date.now();
        
        try {
            // In a real implementation, this would be an actual fetch
            // For demo purposes, we'll simulate a fetch with sample data
            // const response = await fetch(`${endpointUrl}?${params.toString()}`);
            
            // Simulate network delay (500-1500ms)
            await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
            
            // Simulate response
            const data = simulateFetch(category);
            lastFetchedData = data;
            
            // Calculate response time
            const elapsed = Date.now() - startTime;
            
            // Display response in modal
            responseStatus.textContent = '200 OK';
            responseTime.textContent = `${elapsed}ms`;
            responseData.textContent = JSON.stringify(data, null, 2);
            
            // Show the data in the data tab
            displayData(data);
            
            // If chartable and chart tab is active, render chart
            if (category.chartable && document.querySelector('.tab-btn[data-tab="chart"]').classList.contains('active')) {
                renderChart(data);
            }
            
            // Reset fetch button animation
            setTimeout(() => {
                fetchDataBtn.classList.remove('animate__animated', 'animate__pulse');
            }, 500);
            
            // Show success modal with animation
            apiResponseModal.style.display = 'flex';
            document.querySelector('.modal-content').classList.add('animate__animated', 'animate__zoomIn');
            
            // Update progress bar (simulate API usage)
            updateUsageCounter();
            
        } catch (error) {
            console.error('Error fetching data:', error);
            
            // Reset fetch button animation
            setTimeout(() => {
                fetchDataBtn.classList.remove('animate__animated', 'animate__pulse');
            }, 500);
            
            dataDisplay.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-exclamation-triangle" style="color: var(--danger-color); font-size: 3rem;"></i>
                    <p>Error fetching data: ${error.message}</p>
                </div>
            `;
            
            // Show error modal
            responseStatus.textContent = '500 Error';
            responseTime.textContent = `${Date.now() - startTime}ms`;
            responseData.textContent = JSON.stringify({ error: error.message }, null, 2);
            
            apiResponseModal.style.display = 'flex';
            document.querySelector('.modal-content').classList.add('animate__animated', 'animate__zoomIn');
        }
    }
    
    function updateUsageCounter() {
        // Simulate incrementing the usage counter
        const todayCounter = document.querySelector('.usage-metric:nth-child(2) h4');
        const totalCounter = document.querySelector('.usage-metric:nth-child(1) h4');
        const limitCounter = document.querySelector('.usage-metric:nth-child(3) h4');
        
        const todayCount = parseInt(todayCounter.textContent) + 1;
        const totalCount = parseInt(totalCounter.textContent) + 1;
        const limit = parseInt(limitCounter.textContent);
        
        // Animate the counters
        todayCounter.classList.add('animate__animated', 'animate__bounceIn');
        totalCounter.classList.add('animate__animated', 'animate__bounceIn');
        
        todayCounter.textContent = todayCount;
        totalCounter.textContent = totalCount;
        
        setTimeout(() => {
            todayCounter.classList.remove('animate__animated', 'animate__bounceIn');
            totalCounter.classList.remove('animate__animated', 'animate__bounceIn');
        }, 500);
        
        // Update progress bar
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-container span');
        const progressPercent = Math.min(100, Math.round((todayCount / limit) * 100));
        
        progressBar.style.width = `${progressPercent}%`;
        progressText.textContent = `${progressPercent}% of daily limit used`;
        
        // Change progress bar color based on usage
        if (progressPercent > 90) {
            progressBar.style.background = 'linear-gradient(90deg, var(--danger-color), var(--warning-color))';
        } else if (progressPercent > 70) {
            progressBar.style.background = 'linear-gradient(90deg, var(--warning-color), var(--accent-color))';
        }
    }
    
    function displayData(data) {
        if (!data || data.length === 0) {
            dataDisplay.innerHTML = `
                <div class="loading-placeholder animate__animated animate__fadeIn">
                    <i class="fas fa-info-circle" style="font-size: 3rem; color: var(--info-color);"></i>
                    <p>No data available.</p>
                </div>
            `;
            return;
        }
        
        // Create table
        const table = document.createElement('table');
        table.className = 'data-table animate__animated animate__fadeIn';
        
        // Create header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create body
        const tbody = document.createElement('tbody');
        
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            
            // Add animation delay based on row index
            row.classList.add('animate__animated', 'animate__fadeIn');
            row.style.animationDelay = `${0.05 * index}s`;
            
            Object.entries(item).forEach(([key, value]) => {
                const td = document.createElement('td');
                
                // Format values based on their type
                if (value === null) {
                    td.textContent = '-';
                } else if (typeof value === 'number') {
                    // Format numbers
                    if (key.includes('price') || key.includes('close') || key.includes('open') || key.includes('high') || key.includes('low')) {
                        td.textContent = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
                    } else if (key.includes('volume') || key.includes('market_cap') || key.includes('shares')) {
                        td.textContent = value.toLocaleString('en-US');
                    } else {
                        td.textContent = value;
                    }
                } else if (key.includes('date') && typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
                    // Format dates
                    td.textContent = new Date(value).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                } else if (key.includes('change') && typeof value === 'number') {
                    // Format percentage changes
                    td.textContent = value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
                    td.className = value >= 0 ? 'up' : 'down';
                } else {
                    td.textContent = value;
                }
                
                row.appendChild(td);
            });
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        
        // Clear and append table
        dataDisplay.innerHTML = '';
        dataDisplay.appendChild(table);
    }
    
    function renderChart(data) {
        const category = apiCategories[activeCategory];
        
        if (!category.chartable || !data || data.length === 0) {
            document.querySelector('.chart-placeholder').style.display = 'flex';
            return;
        }
        
        document.querySelector('.chart-placeholder').style.display = 'none';
        
        // Prepare chart data
        let chartData;
        let chartOptions;
        
        // Sort data by date for line charts (newer dates first)
        data = [...data].sort((a, b) => new Date(a[category.chartConfig.xKey]) - new Date(b[category.chartConfig.xKey]));
        
        // Get colors from CSS variables
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-1').trim();
        const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-color-6').trim();
        
        if (category.chartType === 'line') {
            const xLabels = data.map(item => {
                const date = new Date(item[category.chartConfig.xKey]);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            });
            
            const yValues = data.map(item => item[category.chartConfig.yKey]);
            
            chartData = {
                labels: xLabels,
                datasets: [{
                    label: category.chartConfig.label,
                    data: yValues,
                    borderColor: primaryColor,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: accentColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            };
            
            // If we have volume data, add it as a bar chart
            if (data[0].volume) {
                const volumeData = data.map(item => item.volume);
                const maxVolume = Math.max(...volumeData);
                
                chartData.datasets.push({
                    type: 'bar',
                    label: 'Volume',
                    data: volumeData,
                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                    borderColor: 'rgba(139, 92, 246, 0.4)',
                    borderWidth: 1,
                    yAxisID: 'volume',
                    barPercentage: 0.5
                });
                
                chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: category.chartConfig.label
                            },
                            grid: {
                                color: 'rgba(226, 232, 240, 0.5)'
                            }
                        },
                        volume: {
                            position: 'right',
                            title: {
                                display: true,
                                text: 'Volume'
                            },
                            grid: {
                                display: false
                            },
                            max: maxVolume * 3,
                            ticks: {
                                callback: function(value) {
                                    if (value === 0) return '0';
                                    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                                    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
                                    return value;
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    
                                    if (label) {
                                        label += ': ';
                                    }
                                    
                                    if (context.datasetIndex === 0) {
                                        label += new Intl.NumberFormat('en-US', { 
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 6 
                                        }).format(context.raw);
                                    } else if (context.datasetIndex === 1) {
                                        label += new Intl.NumberFormat('en-US').format(context.raw);
                                    }
                                    
                                    return label;
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    }
                };
            } else {
                chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: category.chartConfig.label
                            },
                            grid: {
                                color: 'rgba(226, 232, 240, 0.5)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    }
                };
            }
        }
        
        // Create chart
        if (currentChart) {
            currentChart.destroy();
        }
        
        currentChart = new Chart(chartCanvas, {
            type: data[0].volume ? 'mixed' : category.chartType,
            data: chartData,
            options: chartOptions
        });
    }
    
    function copyToClipboard(text, type = 'text') {
        navigator.clipboard.writeText(text)
            .then(() => {
                // Show success message
                showToast(`${type} copied to clipboard!`, 'success');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                showToast('Failed to copy to clipboard', 'error');
            });
    }
    
    function downloadResponse() {
        const data = responseData.textContent;
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `${activeCategory}-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            showToast('File downloaded successfully!', 'success');
        }, 100);
    }
    
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} animate__animated animate__fadeInUp`;
        
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('animate__fadeInUp');
            toast.classList.add('animate__fadeOutDown');
            
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 500);
        }, 3000);
    }
    
    // Helper function to simulate fetch results
    function simulateFetch(category) {
        // For demo, generate more sample data based on the category's sample response
        const sampleData = category.sampleResponse;
        const result = [];
        
        // Generate realistic data points
        let recordsToGenerate = 30;
        
        if (sampleData && sampleData.length > 0) {
            // For price data, generate realistic price movements
            if (category.chartable) {
                let basePrice = sampleData[0].close || 100;
                let volatility = 0.02; // 2% daily volatility
                let trend = 0.001; // Slight upward trend
                
                const today = new Date();
                
                for (let i = 0; i < recordsToGenerate; i++) {
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    
                    // Create random price movement
                    const randomChange = (Math.random() * 2 - 1) * volatility;
                    const trendChange = trend * (recordsToGenerate - i);
                    const changePercent = randomChange + trendChange;
                    
                    const close = basePrice * (1 + changePercent);
                    const open = close * (1 + (Math.random() * 0.02 - 0.01));
                    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
                    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
                    const volume = Math.floor(Math.random() * 10000000) + 1000000;
                    
                    // Create item based on the first sample item
                    const baseItem = {...sampleData[0]};
                    
                    baseItem.date = dateStr;
                    baseItem.close = parseFloat(close.toFixed(2));
                    baseItem.open = parseFloat(open.toFixed(2));
                    baseItem.high = parseFloat(high.toFixed(2));
                    baseItem.low = parseFloat(low.toFixed(2));
                    baseItem.volume = volume;
                    
                    result.push(baseItem);
                    
                    // Update base price for next iteration
                    basePrice = close;
                }
            } else {
                // For non-price data, generate variations of the sample data
                for (let i = 0; i < recordsToGenerate; i++) {
                    const baseItem = {...sampleData[i % sampleData.length]};
                    
                    // For symbols, create variations
                    if ('trading_symbol' in baseItem) {
                        // Generate realistic trading symbols
                        const symbols = 'AAPL,MSFT,GOOGL,AMZN,TSLA,META,NVDA,JNJ,INTC,AMD,KO,PEP,DIS,CSCO,ORCL,IBM,NFLX,PYPL,ADBE,CRM'.split(',');
                        const companies = 'Apple Inc.,Microsoft Corporation,Alphabet Inc.,Amazon.com Inc.,Tesla Inc.,Meta Platforms Inc.,NVIDIA Corporation,Johnson & Johnson,Intel Corporation,Advanced Micro Devices Inc.,The Coca-Cola Company,PepsiCo Inc.,The Walt Disney Company,Cisco Systems Inc.,Oracle Corporation,International Business Machines,Netflix Inc.,PayPal Holdings Inc.,Adobe Inc.,Salesforce Inc.'.split(',');
                        
                        if (i < symbols.length) {
                            baseItem.trading_symbol = symbols[i];
                            
                            if ('registrant_name' in baseItem) {
                                baseItem.registrant_name = companies[i];
                            }
                            
                            if ('fund_name' in baseItem) {
                                baseItem.fund_name = `${companies[i % companies.length]} Fund - Class A`;
                            }
                            
                            if ('description' in baseItem) {
                                baseItem.description = `${companies[i % companies.length]} ${Math.random() > 0.5 ? 'Common Stock' : 'ETF'}`;
                            }
                            
                            if ('title_of_security' in baseItem) {
                                baseItem.title_of_security = `${companies[i % companies.length]} Common Stock`;
                            }
                        }
                    }
                    
                    result.push(baseItem);
                }
            }
            
            return result;
        }
        
        return [];
    }
    
    // Add CSS for toast notifications
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            min-width: 250px;
            text-align: center;
            font-weight: 500;
        }
        
        .toast-success {
            background-color: var(--success-color);
        }
        
        .toast-error {
            background-color: var(--danger-color);
        }
        
        .toast-info {
            background-color: var(--info-color);
        }
        
        .toast i {
            font-size: 1.2rem;
        }
        
        .loader {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 3px solid var(--primary-color);
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .required {
            color: var(--danger-color);
        }
        
        input.error {
            border-color: var(--danger-color);
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
        }
    `;
    document.head.appendChild(styleSheet);
});
