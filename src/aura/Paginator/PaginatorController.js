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
        }
        component.set('v.pages', pages);
    },

    goToLastPage: function (component, event, helper) {
        let currentPage = component.get('v.currentPage');
        let lastPage = component.get('v.pages')

        if (currentPage != lastPage) {
            let shift = lastPage - currentPage;
            helper.shiftPage(component, shift);
        }
    },

    goToFirstPage: function (component, event, helper) {
        let currentPage = component.get('v.currentPage');

        if (currentPage != 1) {
            helper.shiftPage(component, 1 - currentPage);
        }
    },

    goToPreviousPage: function (component, event, helper) {
        helper.shiftPage(component, -1);
    },

    goToNextPage: function (component, event, helper) {
        helper.shiftPage(component, 1);
    },

    validateElementsPerPage: function (component, event, helper) {
        helper.recalculatePages(component)
    },

    goToSpecificPage: function (component, event, helper) {
        helper.shiftPage(component, 0);
    }

})