import {toNumber, toBoolean, _toString, toStringArray} from '@/utils/fieldValueConversion'

describe('Handling data conversions', () => {
    it('Should convert a regular String to String Array', () => {
        const arrayInString = `['Dick Haymes', 'Gordon Jenkins', 'His Orchestra']`;

        const result = toStringArray(arrayInString);
        expect(result).toBeInstanceOf(Object);
        expect(result).toEqual([ 'Dick Haymes', 'Gordon Jenkins', 'His Orchestra' ]);
    });

    it('Should convert a String to String Array inside double quotes', () => {
        const arrayInString = `"['Dick Haymes', 'Gordon Jenkins', 'His Orchestra']"`;

        // "[""Clarence Williams' Blue Five""]"

        const result = toStringArray(arrayInString);
        expect(result).toBeInstanceOf(Object);
        expect(result).toEqual([ 'Dick Haymes', 'Gordon Jenkins', 'His Orchestra' ]);
    });

    
    it('Should convert a String to String Array inside double quotes', () => {
        const arrayInString = `"[""Clarence Williams' Blue Five""]"`;

        const result = toStringArray(arrayInString);
        expect(result).toBeInstanceOf(Object);
        expect(result).toEqual([ "Clarence Williams' Blue Five" ]);
    });



    // it('Should convert a String to String Array inside double quotes + double quotes inside', () => {
    //     const arrayInString = `"['Dick Haymes', 'Gordon Jenkins', 'His Orchestra']"`;
        
    // })

}) 