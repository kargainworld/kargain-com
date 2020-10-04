import AnnounceModel from './announce.model'

export default class UserModel {
    constructor (raw) {
        this.raw = raw ?? {};
    }

    get getRaw () {
        return this.raw;
    }

    get getID () {
        return this.raw?.id;
    }

    get getRole () {
        return this.raw?.role;
    }

    get getIsAdmin () {
        return this.raw?.isAdmin ?? false;
    }

    get getIsPro () {
        return this.raw?.isPro ?? false;
    }

    get getIsActivated () {
        return this.raw?.activated ?? false;
    }
    
    get getIsEmailValidated () {
        return this.raw?.email_validated ?? false;
    }

    get getFullName () {
        return this.raw?.fullname;
    }

    //stripe
    get getHasProPlan () {
        return this.raw?.hasProPlan ?? false;
    }

    get getSubscription () {
        return this.raw?.subscription ?? null;
    }

    get getSubscriptionOfferName () {
        return this.raw?.subscription?.offer?.name ?? null;
    }

    get getSubscriptionOfferTitle () {
        return this.raw?.subscription?.offer?.title ?? null;
    }

    get getAvatar () {
        return this.raw?.avatar?.location ?? this.raw?.avatarUrl ?? '/images/profile.png';
    }

    get getProfileLink () {
        return this.getUsername ? `/profile/${this.getUsername}` : '/';
    }

    get getProfileEditLink () {
        return this.getUsername ? `/profile/${this.getUsername}/edit` : '/';
    }

    get getFirstname () {
        return this.raw?.firstname;
    }

    get getLastname () {
        return this.raw?.lastname;
    }

    get getUsername () {
        return this.raw?.username;
    }

    get getEmail () {
        return this.raw?.email;
    }
    
    get getEmailIsGmail () {
        return this.getEmail.includes('gmail');
    }

    get getPhone () {
        return this.raw?.phone;
    }

    get getGarage () {
        const garage = this.raw?.garage ?? [];
        return garage
            .filter(announce => announce.visible)
            .map(announce => new AnnounceModel(announce));
    }
    
    get getCountGarage () {
        return this.getGarage.length
    }

    get getHiddenGarage () {
        return this.getGarage.filter(announce => !announce.getIsVisible);
    }

    get getFavorites () {
        const favorites = this.raw?.favorites ?? [];
        return favorites.map(favorite => new AnnounceModel(favorite))
    }

    get getFollowers () {
        const followers = this.raw?.followers ?? [];
        return followers
            .filter(like => !!like.user)
            .map(like => new UserModel(like.user))
    }

    get getCountFollowers () {
        return this.getFollowers.length;
    }

    get getFollowings () {
        const followings = this.raw?.followings ?? [];
        return followings
            .filter(like => !!like.user)
            .map(like => new UserModel(like.user))
    }

    get getCountFollowings () {
        return this.getFollowings.length;
    }

    get getDescription () {
        return this.raw?.about;
    }

    get getCountryLabel () {
        return this.raw?.countrySelect?.value;
    }

    get getAddressParts () {
        const houseNumber = this.raw?.address?.housenumber;
        const street = this.raw?.address?.street;
        const city = this.raw?.address?.city;
        const postCode = this.raw?.address?.postCode;
        const country = this.raw?.address?.country;
        const fullAddress = this.raw?.address?.fullAddress;

        return {
            fullAddress,
            houseNumber,
            street,
            city,
            postCode,
            country,
        };
    }

    updateAnnounces (announces) {
        this.raw.garage = announces
    }

    buildAddressString (parts = ['street', 'city', 'postCode', 'country']) {
        const keys = !Array.isArray(parts) ? [parts] : parts;
        return keys
            .filter(key => this.getAddressParts[key] != null)
            .map(key => this.getAddressParts[key])
            .join(', ');
    }

    buildAddressGoogleMapLink (parts = ['street', 'city', 'postCode', 'country']) {
        const base = "https://www.google.com/maps/search/?api=1"
        const keys = !Array.isArray(parts) ? [parts] : parts;
        const string = keys
          .filter(key => this.getAddressParts[key] != null)
          .map(key => this.getAddressParts[key])
          .join('+');
        return `${base}&query=${encodeURI(string)}`
    }
};
