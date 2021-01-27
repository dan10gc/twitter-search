import React from 'react';
import './scss/app.scss';
import { Feed } from './components/Feed';
import Hashtag from './components/Hashtag';
import { useDebounce } from './helpers/useDebounce';
import { searchTweets } from './services/twitter';
import { HashtagModel, Status } from './types';
import { FaSearch } from 'react-icons/fa';
import { searchReducer, SearchTypes } from './reducers/searchReducer';

function App() {
	const initialState = {
		tweets: [],
		hashtags: [],
		metaData: null,
		status: Status.IDLE,
		paginationStatus: Status.IDLE,
	};
	const [state, dispatch] = React.useReducer(searchReducer, initialState);
	const { tweets, status, hashtags, metaData, paginationStatus } = state;
	const [value, setValue] = React.useState<string>('');
	const debouncedSearchTerm = useDebounce(value, 500);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

	const onLoadMore = () => {
		// @ts-ignore
		if (!metaData.next_results) {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		dispatch({ type: SearchTypes.PAGINATION_STATUS, payload: { paginationStatus: Status.PENDING } });
		// @ts-ignore
		searchTweets(metaData.next_results)
			.then((results) => {
				const statuses = results.statuses.map((result: any) => result);

				const hashtags: Array<string> = statuses
					.flatMap((result: any) => result.entities.hashtags)
					.map((hashtag: HashtagModel) => hashtag.text);

				dispatch({
					type: SearchTypes.PAGINATION,
					payload: { tweets: statuses, hashtags, metaData: results.search_metadata },
				});
			})
			.catch((err) => {
				console.warn(err);
				dispatch({ type: SearchTypes.PAGINATION_STATUS, payload: { paginationStatus: Status.REJECTED } });
			});
	};

	const onFilteredSearch = (hashtag: string) => {
		setValue((prevState) => `${prevState} #${hashtag}`);
	};

	React.useEffect(() => {
		if (debouncedSearchTerm) {
			dispatch({ type: SearchTypes.STATUS, payload: { status: Status.PENDING } });

			searchTweets(`?q=${debouncedSearchTerm}&result_type=popular&count=5`)
				.then((results) => {
					const statuses = results.statuses.map((result: any) => result);
					const hashtags: Array<string> = statuses
						.flatMap((result: any) => result.entities.hashtags)
						.map((hashtag: HashtagModel) => hashtag.text);

					dispatch({
						type: SearchTypes.ADD_TWEETS,
						payload: { tweets: statuses, hashtags, metaData: results.search_metadata },
					});
				})
				.catch((err) => {
					console.warn(err);
					dispatch({ type: SearchTypes.STATUS, payload: { status: Status.REJECTED } });
				});
		} else {
			// dispatch({
			// 	type: SearchTypes.ADD_TWEETS,
			// 	payload: { tweets: [], hashtags: [], metaData: null },
			// });
		}
	}, [debouncedSearchTerm]);
	return (
		<div className="container mt-4 py-2">
			<h1 className="title pl-mobile">Tweet Feed</h1>

			<div className="columns mt-3">
				<div className="column is-two-thirds is-paddingless-mobile">
					<div className="control has-icons-left mb-4 mx-mobile">
						<span className="icon is-small is-left py-5">
							<FaSearch />
						</span>

						<input
							className="input py-5"
							type="search"
							placeholder="Search by keyword"
							value={value}
							onChange={onChange}
						/>
					</div>
					<div className="box is-hidden-tablet px-mobile">
						<h4 className="title is-size-4">Filter by hashtag</h4>
						{hashtags.map((hashtag, index) => (
							<Hashtag
								{...{ hashtag }}
								onHashtagPress={() => onFilteredSearch(hashtag)}
								key={hashtag + index}
							/>
						))}
					</div>
					<Feed {...{ tweets, status, onLoadMore, paginationStatus, metaData }} />
				</div>
				<div className="column is-hidden-mobile">
					<div className="box ">
						<h1 className="title is-4">Filter by hashtag</h1>
						<div className="is-flex-direction-row flex-wrap is-justify-content-start">
							{hashtags.map((hashtag, index) => (
								<Hashtag
									{...{ hashtag }}
									onHashtagPress={() => onFilteredSearch(hashtag)}
									key={hashtag + index}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
