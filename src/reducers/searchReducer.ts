import { ActionMap, MetaDataModel, Status } from '../types';

export enum SearchTypes {
	ADD_TWEETS = 'add_tweets',
	PAGINATION = 'pagination',
	STATUS = 'status',
	PAGINATION_STATUS = 'pagination_status',
}

export type SearchType = {
	tweets: Array<any>;
	hashtags: Array<string>;
	metaData: MetaDataModel | null;
	status: Status;
	paginationStatus: Status;
};

type SearchPayload = {
	[SearchTypes.ADD_TWEETS]: {
		tweets: Array<any>;
		hashtags: Array<string>;
		metaData: MetaDataModel | null;
	};
	[SearchTypes.PAGINATION]: {
		tweets: Array<any>;
		hashtags: Array<string>;
		metaData: MetaDataModel | null;
	};
	[SearchTypes.STATUS]: {
		status: Status;
	};
	[SearchTypes.PAGINATION_STATUS]: {
		paginationStatus: Status;
	};
};

export type SearchActions = ActionMap<SearchPayload>[keyof ActionMap<SearchPayload>];

export const searchReducer = (state: SearchType, actions: SearchActions) => {
	switch (actions.type) {
		case SearchTypes.ADD_TWEETS: {
			return {
				...state,
				tweets: actions.payload.tweets,
				hashtags: actions.payload.hashtags,
				metaData: actions.payload.metaData,
				status: Status.RESOLVED,
			};
		}
		case SearchTypes.PAGINATION: {
			return {
				...state,
				tweets: [...state.tweets, ...actions.payload.tweets],
				hashtags: [...state.hashtags, ...actions.payload.hashtags],
				metaData: actions.payload.metaData,
				paginationStatus: Status.RESOLVED,
			};
		}
		case SearchTypes.STATUS: {
			return {
				...state,
				status: actions.payload.status,
			};
		}
		case SearchTypes.PAGINATION_STATUS: {
			return {
				...state,
				paginationStatus: actions.payload.paginationStatus,
			};
		}
		default:
			return state;
	}
};
