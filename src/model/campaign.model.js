import PropTypes from 'prop-types';

export class Campaign {
    id = undefined;
    constructor(name, descr){
        this.name = name;
        this.descr = descr;
    }
}

export const CampaignType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
});