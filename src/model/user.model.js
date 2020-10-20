import PropTypes from 'prop-types';

export class User {
    id = undefined;
    constructor(firstName, lastName, email, password, passwordConfirmed){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.passwordConfirmed = passwordConfirmed;
    }
}

export const CampaignType = PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
});