export default interface IOffers {
    id: string;
    name: string;
    advertiserId?: string;
    company?: string;
    payout: string;
    allowedCountries: string[];
    status: string;
};