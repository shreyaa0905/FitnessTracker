/**
 * food-log controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::food-log.food-log',
    ({strapi})=>({
         async create(ctx) {
        const user = ctx.state.user;
        if (!user) return ctx.unauthorized('Login required');

        const body = ctx.request.body.data;
        body.users_permissions_user = user.id;

        const entry = await strapi.documents('api::food-log.food-log').create({
            data: body,
            populate: ['users_permissions_user']
        });

        return entry;
    },

    async find(ctx) {
        const user = ctx.state.user;
        if (!user) return ctx.unauthorized('Login required');

        const result = await strapi.documents('api::food-log.food-log').findMany({
            filters: { users_permissions_user: user.id },
            populate: ['users_permissions_user']
        });

        return result;
    },

    async findOne(ctx) {
        const user = ctx.state.user;
        if (!user) return ctx.unauthorized('Login required');

        const { id } = ctx.params;

        const result = await strapi.documents('api::food-log.food-log').findFirst({
            filters: { documentId: id, users_permissions_user: user.id },
            populate: ['users_permissions_user']
        });

        if (!result) return ctx.notFound('Not found or not yours');
        return result;
    }

  
    }));
