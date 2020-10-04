const AnnounceModel = require('../models').Announce
const UserModel = require('../models').User
const Errors = require('../utils/errors')
const Messages = require('../utils/messages')
const unionBy = require('lodash').unionBy

const fetchAnnounces = async (req) => {
    const sorters = { createdAt: -1 }
    const queryString = req.query?.q?.toLowerCase()
 
    //fetching single profile
    const isAuthenticated = !!req.user
    const isPro = !isAuthenticated ? false : Boolean(req.user?.isPro || false)
 
    let announceQuery = {
        $text: {
        	$search: queryString
	        // diacriticSensitive : true
        },
        visible: true,
        activated: true,
        status: 'active' //enum['deleted', 'archived', 'active']
    }
 
    if (!isPro) {
        announceQuery = {
            ...announceQuery,
            adType: {
                $ne: 'sale-pro'
            }
        }
    }
 
    let fetchSearch = await AnnounceModel
        .find(announceQuery, '-damages')
        .sort(sorters)
	    .populate({
		    path: 'manufacturer.make'
	    })
	    .populate({
		    path: 'manufacturer.model'
	    })
        .populate({
            path: 'user',
            select: '-followings -followers -favorites -garage'
        })

    const { $text, ...rest } = announceQuery
    let fetchPopulate = await AnnounceModel
	    .find(rest, '-damages')
	    .sort(sorters)
	    .populate({
		    path: 'manufacturer.make'
	    })
	    .populate({
		    path: 'manufacturer.model'
	    })

    fetchPopulate = fetchPopulate
        .filter(row => {
            if(row.manufacturer.make?.make_slug.includes(queryString)){
                return true
            }
            if(row.manufacturer.model?.model.includes(queryString)){
                return true
            }
        })
	
    return unionBy(fetchSearch, fetchPopulate, '_id')
}

const fetchUsers = async (req) => {
    const sorters = { createdAt: -1 }
    const queryString = req.query?.q?.toLowerCase()
	
    const query = {
        $text: {
        	$search: queryString
	        // diacriticSensitive : true
        },
        $or: [
            { removed: false },
            { removed: {
            	$exists: false
            }}
        ]
    }
	
    return await UserModel
        .find(query, '-location -favorites')
        .sort(sorters)
}

exports.filterSearchAction = () => async (req, res, next) => {
    const queryString = req.query?.q?.toLowerCase()
    if(!queryString) {return next(Errors.NotFoundError(Messages.errors.query_is_empty))}
	
    try{
        const announces = await fetchAnnounces(req)
        const users = await fetchUsers(req)
		
        return res.json({
            success: true,
            data : {
                announces,
                users
            }
        })
    }
    catch (err){
        return next(err)
    }
}
