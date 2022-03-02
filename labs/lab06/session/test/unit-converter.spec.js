// import { strict as assert } from 'assert';
import { expect } from 'chai';

import { UnitConverter } from "../unit-converter.js";

let uc = new UnitConverter();

describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            // assert.equal([1, 2, 3, 4].indexOf(4), -1);
            expect([1, 2, 3].indexOf(4)).to.equal(-1);
        });

    });
});

describe('UnitConverter', () => {
    describe('#kilogramToPound()', () => {
        it('1 kg should be equal to 2.2046 lb', () => {
            // assert.equal([1, 2, 3, 4].indexOf(4), -1);
            expect(uc.kilogramToPound(1.0)).to.equal(2.2046);
        });
    });
});
