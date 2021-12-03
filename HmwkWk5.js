/*
    Menu System for Week 5 Coding Assingment

    This menu system creates a stock as a car dealership than add cars to that dealerships stock.

    Wasnt quite sure if the input arrays where the array you where asking for when the instructions said must use an array.


*/

class Car {
    constructor( year, make, model, trim ){
        this.year = year;
        this.make = make;
        this.model = model;
        this.trim = trim;
    }

    describe() {
        return `${ this.year} ${ this.make } ${ this.model } ${ this.trim }`;
    }
}

class Stock {
    constructor( name ) {
        this.name = name;
        this.cars = [];
    }

    addCar( car ) {
        if ( car instanceof Car ) {
            this.cars.push( car );
        } else {
            throw new Error( "You can only add an instance of car. Argument is not a car: ${car} " );
        }
    }

    describe() {
        return `${this.name} has ${this.cars.length} cars.`;
    }
}

class Menu {
    constructor() {
        this.stocks = [];
        this.selectedStock = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while ( selection != 0 ){
            switch ( selection ){
                case '1': 
                    this.createStock();
                    break;
                case '2':
                    this.viewStock();
                    break;
                case '3':
                    this.deleteStock();
                    break;
                case '4':
                    this.displayStock();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert( "Goodbye!" );
    }

    showMainMenuOptions() {
        return prompt( `
            0) Exit
            1) Create new Dealership
            2) View Dealership
            3) Delete Dealership
            4) Display all Dealships
            ` );
    }

    showStockMenuOptions( carsInfo ) {
        return prompt( `
        0) Back
        1) Create car
        2) Delete car
        -------------
        ${ carsInfo }
        `);
    }

    displayStock() {
        let stockString = " ";
        for( let i = 0; i < this.stocks.length; i++ ) {
            stockString += i + `) ` + this.stocks[ i ].name + "\n";
        }
        alert( stockString );
    }

    createStock() {
        let name = prompt( "Enter name for new Dealership:" );
        this.stocks.push( new Stock( name ) );
    }

    viewStock() {
        let index = prompt( "Enter the index of the Dealership you wish to view:" );
        if( index > -1 && index < this.stocks.length ){
            this.selectedStock = this.stocks[ index ];
            let description = " Dealership Name: " + this.selectedStock.name + "\n";

            for( let i = 0; i < this.selectedStock.cars.length; i++ ) {
                description += i + `) ` + this.selectedStock.cars[i].year + " - " + this.selectedStock.cars[i].make + " - " + this.selectedStock.cars[i].model + " - " + this.selectedStock.cars[i].trim   + "\n";      
            }

            let selection = this.showStockMenuOptions( description );
            switch ( selection ) {
                case "1":
                    this.createCar();
                    break;
                case "2":
                    this.deleteCar();
            }
        }
    }

    deleteStock() {
        let index = prompt( "Enter the index of the dealership you wish to delete:" );
        if ( index > -1 && index < this.stocks.length ){
            this.stocks.splice( index, 1 );
        }
    }

    createCar() {
        let year = prompt( "Enter year for new Car:" );
        let make = prompt( "Enter make for new Car:" );
        let model = prompt( "Enter model for new Car:" );
        let trim = prompt( "Enter trim for new Car:" );
        this.selectedStock.cars.push( new Car( year, make, model, trim ) );
    }

    deleteCar() {
        let index = prompt( "Enter the index of the car you want to delete:" );
        if ( index > -1 && index < this.selectedStock.cars.length ) {
            this.selectedStock.cars.splice( index, 1 );
        }
    }
}

let menu = new Menu();
menu.start();