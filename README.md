# Nexo Transaction Scraper

## Installation

- Download the `release.zip` file from the latest release on the [downloads page](https://github.com/Elite-Stonks/Nexo-Transaction-Scraper/releases).
- Unzip the file.
- Open the Extension Manager page of any browser that is compatible with Chrome Extensions.
- Enable developer mode.
- Click "Load unpacked".
- Navigate to where you unzipped the file and select the unzipped folder.
- Now the extension is installed.

## Usage

- Navigate to the [Nexo transactions page](https://platform.nexo.io/transactions).
- Set a sensible date range to load transactions. If you load too many transactions then Nexo may encounter an error and you'll need to start again. I recommend loading transactions for 2-3 months at a time, if you get an error then lower the number of months you are loading at a time.
- Scroll the page to trigger the loading of all the transactions. Keep scrolling until there are no more transactions to load.
- Open the extension by clicking the extension icon and then clicking "Nexo Transaction Scraper" (you can pin it for quicker access later).
- Click "Get Transactions".
- Wait for the extension to finish scraping transactions. Depending on how many transactions are loaded, it can take some time.
- Navigate to the "Transactions" tab if you want to verify that your transactions have been successfully scraped.
- Navigate to the "Export" tab and then export your transactions to CSV.
- Navigate to the "Donate" tab and select a crypto address to donate to if you would like to say thanks.

## Donating

If you have benefited from this project and would like to donate as a way of thanks, you can send crypto to any of the addresses below:

### Etherum
```
0x8212A0022C7f5cC7B2f1C910367fec1F8fCae116
```

### Polygon
```
0x8212A0022C7f5cC7B2f1C910367fec1F8fCae116
```

### Avalanche
```
0x8212A0022C7f5cC7B2f1C910367fec1F8fCae116
```

### Binance Smart Chain
```
0xF1dc97aB817cf2Ed0aBdbE9C551Dc80F63BDAF9f
```

### Terra
```
terra1na3mqdyle4r5v3yl8nlvy5qklvpfrz06hn6ap5
```

### Permission
```
0x47f495fa22f91b3dca759ed680cce41cc572c6a0
```

## Future Improvements
- Auto scroll to load transactions.
- Support more transaction types.
- Publish to Chrome extension store.
- Support other browsers that do not support Chrome extensions.

## Contributing

Clone the repository locally:

```
$ git clone https://github.com/elite-stonks/nexo-transaction-scraper.git
```

Change into the directory:

```
$ cd ./nexo-transaction-scraper
```

Install dependencies:

```
$ npm i
```

Build:

```
npm run build
```

Navigate to the Extension manager in your browser. Click "Load Unpacked". Navigate to the "dist" folder of the project and select.

After you make changes, run the build again and reload the extension in the Extension Manager.
