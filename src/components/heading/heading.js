import './heading.scss';
import $ from 'jquery';

class Heading {
    render() {
        const h1 = $('<h1>');
        const body = $('body');
        h1.text('webpack is here');
        body.append(h1);
    }
}

export default Heading;