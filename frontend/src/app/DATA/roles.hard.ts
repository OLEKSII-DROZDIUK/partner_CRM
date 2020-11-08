export const GLOBAL_ROLES: any =  {
    advertisers: {
        view: ['admin', 'advertiserManager','affiliateManager'],
        edit:['admin', 'advertiserManager'],
        create: ['admin', 'advertiserManager'],
        delete: ['admin'],
    },
    offers: {
        view: ['admin', 'advertiserManager','affiliateManager'],
        edit:['admin', 'advertiserManager'],
        create: ['admin', 'advertiserManager'],
        delete: ['admin'],
    },
    affiliates: {
        view: ['admin', 'advertiserManager','affiliateManager'],
        edit:['admin', 'affiliateManager'],
        create: ['admin', 'affiliateManager'],
        delete: ['admin',],
    },
    users: {
        view: ['admin'],
        edit: ['admin'],
        create: ['admin'],
        delete: ['admin'],
    },
};