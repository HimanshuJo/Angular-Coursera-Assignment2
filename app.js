(function () {
    'use strict';
    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController)
        .provider('ShoppingListService', ShoppingListServiceProvider);

    function ShoppingListService(maxItems) {
        let service = this;
        let items = [
            { name: "cookies", quantity: 10 },
            { name: "coffee pack", quantity: 1 },
            { name: "milk pack", quantity: 1 },
            { name: "chicken pack", quantity: 1 },
            { name: "chocolate pack", quantity: 1 }
        ];
        let boughtItems = [];

        service.removeItem = function (itemIndex) {
            boughtItems.push({ name: items[itemIndex].name, quantity: items[itemIndex].quantity });
            items.splice(itemIndex, 1);
        };

        service.getItems = function () {
            return items;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };
    };

    function ShoppingListServiceProvider() {
        let provider = this;
        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function () {
            let shoppingList = new ShoppingListService(provider.defaults.maxItems);
            return shoppingList;
        };
    };

    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
        let list1 = this;
        list1.items = ShoppingListService.getItems();
        list1.boughtItems = ShoppingListService.getBoughtItems();

        list1.removeItem = function (itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    };
})();