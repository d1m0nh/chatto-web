// @flow

"use strict";

declare let module : {
    hot : {
        accept(path:string, callback:() => void): void;
    };
};
