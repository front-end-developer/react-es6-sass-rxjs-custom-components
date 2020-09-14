/**
 * Created by Mark Webley on 13/09/2020.
 */
const WishListStore = {
    toggle: (nameStorage, value) => {
        if (typeof WishListStore.get(nameStorage).movieDetail === "undefined") {
            WishListStore.add(nameStorage, value);
        } else {
            WishListStore.remove(nameStorage, value);
        }
    },

    get: (nameStorage) => {
        if (window.localStorage.getItem(nameStorage)) {
            return JSON.parse(window.localStorage.getItem(nameStorage));
        }
        return {};
    },

    add: (nameStorage, value) => {
        window.localStorage.setItem(nameStorage, JSON.stringify({movieDetail: value}));
    },

    remove: (nameStorage, value) => {
        window.localStorage.removeItem(nameStorage);
    }
}

export default WishListStore;
