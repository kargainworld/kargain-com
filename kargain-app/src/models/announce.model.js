import UserModel from './user.model'
import parseISO from 'date-fns/parseISO'
import ImageModel from './image.model'
import CommentModel from './comment.model'

export default class AnnounceModel {
    
    constructor (ad) {
        this.raw = ad ?? {};
    }

    //accessors
    get getRaw () {
        return this.raw;
    }

    get getID () {
        return this.raw?.id;
    }

    get getAuthor () {
        return new UserModel(this.raw?.user);
    }

    get getSlug () {
        return this.raw?.slug;
    }

    get getAnnounceLink () {
        return this.getSlug ? `/announces/${this.getSlug}` : '/';
    }
    
    get getAnnounceShareLink () {
        return this.getSlug ? `https://kargain.com/announces/announces/${this.getSlug}` : null
    }

    get getAnnounceEditLink () {
        return this.getSlug ? `/announces/${this.getSlug}/edit` : '/';
    }

    get getTitle () {
        return this.raw?.title;
    };

    get getPrice () {
        return this.raw?.price ? Number(this.raw?.price) : 0;
    }

    get getPriceHT () {
        return this.raw?.priceHT ? Number(this.raw?.priceHT) : 0;
    }
    
    get getManufacturer () {
        const make = this.raw?.manufacturer?.make?.['make'] ?? null;
        const model = this.raw?.manufacturer?.model?.['model'] ?? null;
        const year = this.raw?.manufacturer?.model?.['year'] ?? null;
        const version = this.raw?.manufacturer?.model?.['trim'] ?? null;

        return {
            make,
            model,
            year,
            version,
        };
    }

    get getAnnounceTitle () {
        return [
            ...Object.entries(this.getManufacturer)
                .filter(([,value]) => value)
                .map(([,value]) => value)
            ,this.geVehicleEngineType
        ].join(' | ')
    }

    get getVehicleAdType () {
        return this.raw?.adType;
    }

    get getVehicleType () {
        return this.raw?.vehicleType;
    }

    get geVehicleEngineType () {
        return this.raw?.vehicleEngineType?.label;
    }

    get geVehicleEngineGas () {
        return this.raw?.vehicleEngineGas?.label;
    }

    get geVehicleEngineCylinder () {
        return this.raw?.vehicleEngineCylinder;
    }

    get getVehiclePowerCh () {
        return this.raw?.powerCh;
    }

    get getVehiclePowerKw () {
        return this.raw?.powerKw;
    }

    get getVehicleFunction () {
        return this.raw?.vehicleFunction?.label;
    }

    get getVehicleGeneralState () {
        return this.raw?.vehicleGeneralState?.label;
    }

    get getVehicleDoors () {
        return this.raw?.doors?.label;
    }

    get getVehicleSeats () {
        return this.raw?.seats?.label;
    }

    get getVehicleEquipments () {
        return this.raw?.equipments ?? [];
    }

    get getVehicleEmissionClass () {
        return this.raw?.emission?.label;
    }

    get getVehicleExternalColor () {
        return this.raw?.externalColor?.label;
    }

    get getVehicleInternalColor () {
        return this.raw?.internalColor?.label;
    }

    get getVehiclePaintColor () {
        return this.raw?.paint?.label;
    }

    get getVehicleMaterials () {
        return this.raw?.materials ?? [];
    }

    get getVehicleCountOwners () {
        return this.raw?.ownersCount?.value;
    }

    get getNationality () {
        return 'FR';
    }

    get getCountryLabel () {
        return this.raw?.countrySelect?.label;
    }

    //allowed : ['houseNumber', 'street', 'city', 'postCode', 'fullAddress', 'country'
    getAdOrAuthorCustomAddress = (queryParts = ['street', 'city', 'postCode', 'country']) => {
        const adParts = this.getAddressParts;
        const authorParts = this.getAuthor.getAddressParts;

        return queryParts ? queryParts.reduce((carry, part) => {
            const value = (part === 'country') ? this.getCountryLabel : adParts[part] ?? authorParts[part];
            return value ? [...carry, value] : carry;
        }, []).join(', ') : null;
    };

    buildAddressGoogleMapLink (parts = ['street', 'city', 'postCode', 'country']) {
        const base = "https://www.google.com/maps/search/?api=1"
        const keys = !Array.isArray(parts) ? [parts] : parts;
        const string = keys
          .filter(key => this.getAddressParts[key] != null)
          .map(key => this.getAddressParts[key])
          .join('+');
        return `${base}&query=${encodeURI(string)}`
    }

    get getAddressParts () {
        const houseNumber = this.raw?.address?.housenumber;
        const street = this.raw?.address?.street;
        const city = this.raw?.address?.city;
        const postCode = this.raw?.address?.postCode;
        const fullAddress = this.raw?.address?.fullAddress;

        return {
            houseNumber,
            street,
            city,
            postCode,
            fullAddress,
        };
    }

    get getLocation () {
        const coordinates = this.raw?.location?.coordinates;
        const longitude = coordinates?.[0];
        const latitude = coordinates?.[1];

        return {
            coordinates,
            latitude,
            longitude,
        };
    }

    get getTags () {
        return this.raw?.tags ?? [];
    }

    get getDamagesTabs () {
        return this.raw?.damages ?? [];
    }

    get getCountDamages () {
        return this.getDamagesTabs.reduce((sum, tab) => sum + tab.stages.length, 0);
    }

    get getMileage () {
        return this.raw?.mileage;
    }

    get getLikes () {
        const likes = this.raw?.likes ?? [];
        return likes.filter(like => like.user !== null).map(like => ({
            getAuthor : new UserModel(like.user)
        }))
    }

    get getCountLikes () {
        return this.getLikes.length;
    }

    get getCountViews () {
        return this.raw?.views ? this.raw?.views.length : 0;
    }

    get getComments () {
        const comments = this.raw?.comments ?? [];
        return comments.map(comment => new CommentModel(comment));
    }

    get getCountComments () {
        return this.getComments.length ?? 0;
    }

    get getImages () {
        const images = this.raw?.images ?? [];
        return images.map(image => new ImageModel(image));
    }

    get getCountImages () {
        return this.getImages?.length ?? 0;
    }

    get getFeaturedImg () {
        return this.getImages[0];
    }

    get getCreationDate () {
        const createdAt = this.raw?.createdAt;
        const date = parseISO(createdAt);
        return {
            date,
            raw: createdAt,
            year: date ? date.getFullYear() : null,
            month: date ? date.getMonth() : null,
            day: date ? date.getDate() : null,
        };
    }

    get getDescription () {
        return this.raw?.description;
    }

    get showCellPhone () {
        return this.raw?.showCellPhone;
    }

    get getIsVisible () {
        return this.raw?.visible;
    }

    get getIsActivated () {
        return this.raw?.activated;
    }

    get getStatus () {
        return this.raw?.status;
    }

    //methods

    getTheExcerpt = (len = 200) => {
        const content = this.raw?.content;
        return content ? content.substring(0, len).concat('...') : null;
    };
}
