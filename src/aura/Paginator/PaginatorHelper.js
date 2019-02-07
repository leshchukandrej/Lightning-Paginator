/**
 * Created by ctuser on 02.01.2019.
 */
({

    getIterator: function (items) {
        if (!Array.isArray(items)) {
            if (items.isInstanceOf('aura:iteration')) {
                return items;
            }
        }

        var iterator;

        for (var i = 0; i < items.length; i++) {
            var child = items[i];
            if (child) {
                if (child.isInstanceOf("aura:iteration")) {
                    return child;
                } else if (!child.isInstanceOf("aura:expression")) {
                    if (child.get("v.body")) {
                        iterator = this.getIterator(child.get("v.body"));
                    }
                } else if (child.isInstanceOf("aura:expression")) {
                    if (child.get("v.value")) {
                        iterator = this.getIterator(child.get("v.value"));
                    }
                }
            }
            if (iterator) {
                return iterator
            }
        }
    },

    recalculatePages: function (component) {

        var iterator = component.get('v.iterator');
        var elementsPerPage = component.get('v.elementsPerPage')

        if (!iterator || !elementsPerPage) {
            return
        }

        var items = iterator.get('v.items');
        var elementsPerPage = component.get('v.elementsPerPage');
        var currentPage = component.get('v.currentPage');

        if (!items || items.length <= elementsPerPage) {
            iterator.set('v.start', 0);
            iterator.set('v.end', elementsPerPage);
            component.set('v.currentPage', 1);
            component.set('v.pages', 1);

            return
        }

        var pages = Math.ceil(items.length / elementsPerPage)

        if ((currentPage - 1) * elementsPerPage + 1 > items.length) {
            let newCurrentPage = Math.ceil(items.length / elementsPerPage)
            if (currentPage != newCurrentPage) {
                iterator.set('v.start', (newCurrentPage - 1) * elementsPerPage);
                iterator.set('v.end', newCurrentPage * elementsPerPage);
                component.set('v.currentPage', newCurrentPage)
            }
        } else {
            iterator.set('v.start', (currentPage - 1) * elementsPerPage);
            iterator.set('v.end', currentPage * elementsPerPage);
        }

        component.set('v.pages', pages);
    },

    shiftPage: function(component, shift){

        var nextPage = parseInt(component.get('v.currentPage')) + shift;

        var iterator = component.get('v.iterator');

        if (!iterator) {
            return
        }

        var pages = component.get('v.pages');
        if (nextPage > pages || nextPage < 1) {
            return
        }

        var elementsPerPage = component.get('v.elementsPerPage');

        iterator.set('v.start', (nextPage - 1) * elementsPerPage);
        iterator.set('v.end', nextPage * elementsPerPage);

        component.set('v.currentPage', nextPage);
    }

})