/**
 * Created by ctuser on 02.01.2019.
 */
({

    doInit: function (component, event, helper) {

        var iterator = helper.getIterator(component.get('v.body'));

        if (!iterator) {
            return
        }

        iterator.addValueHandler({
            value: 'v.items',
            event: 'change',
            method: () => {
                helper.recalculatePages(component)
            }
        })

        var elementsPerPage = component.get('v.elementsPerPage');

        iterator.set('v.start', 0);
        iterator.set('v.end', elementsPerPage);
        component.set('v.iterator', iterator);

        var pages = 1;

        var items = iterator.get('v.items');

        if (items.length > 0) {
            pages = Math.ceil(items.length / elementsPerPage);
            component.set('v.pages', pages);
        }

    },

    goToLastPage: function (component, event, helper) {

        var iterator = component.get('v.iterator');
        if (!iterator) {
            return
        }

        var elementsPerPage = component.get('v.elementsPerPage');
        var lastPage = component.get('v.pages');
        var currentPage = component.get('v.currentPage');
        if (lastPage !== currentPage) {
            iterator.set('v.start', (lastPage - 1) * elementsPerPage);
            iterator.set('v.end', lastPage * elementsPerPage);
            component.set('v.currentPage', lastPage);
        }
    },

    goToFirstPage: function (component, event, helper) {

        var iterator = component.get('v.iterator');
        if (!iterator) {
            return
        }

        iterator.set('v.start', 0);
        iterator.set('v.end', component.get('v.elementsPerPage'));
        component.set('v.currentPage', 1);
    },

    goToPreviousPage: function (component, event, helper) {

        var iterator = component.get('v.iterator');
        if (!iterator) {
            return
        }

        var currentPage = component.get('v.currentPage');
        if (currentPage < 2) {
            return
        }
        var previousPage = currentPage - 1;
        var elementsPerPage = component.get('v.elementsPerPage');

        iterator.set('v.start', (previousPage - 1) * elementsPerPage);
        iterator.set('v.end', previousPage * elementsPerPage);
        component.set('v.currentPage', previousPage);
    },

    goToNextPage: function (component, event, helper) {

        var iterator = component.get('v.iterator');
        if (!iterator) {
            return
        }

        var currentPage = component.get('v.currentPage');
        var pages = component.get('v.pages');
        if (currentPage >= pages) {
            return
        }

        var nextPage = parseInt(currentPage) + 1;
        var elementsPerPage = component.get('v.elementsPerPage');

        iterator.set('v.start', (nextPage - 1) * elementsPerPage);
        iterator.set('v.end', nextPage * elementsPerPage);
        component.set('v.currentPage', nextPage);
    },

    validateElementsPerPage: function (component, event, helper) {

        var elementsPerPage = event.getParam('value')
        if (!elementsPerPage) {
            return
        }

        helper.recalculatePages(component)
    },

    goToSpecificPage: function(component, event, helper) {

        var iterator = component.get('v.iterator');
        if (!iterator) {
            return
        }

        var currentPage = component.get('v.currentPage');
        var elementsPerPage = component.get('v.elementsPerPage');

        iterator.set('v.start', (currentPage - 1) * elementsPerPage);
        iterator.set('v.end', currentPage * elementsPerPage);
    }

})