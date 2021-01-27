import React from 'react';
import { Feed } from './components/Feed';
import Hashtag from './components/Hashtag';
import { useDebounce } from './helpers/useDebounce';
import './scss/app.scss';
import { searchTweets } from './services/twitter';
import { HashtagModel, MetaDataModel, Status } from './types';
import { FaSearch } from 'react-icons/fa';

function App() {
	const [value, setValue] = React.useState<string>('');
	const [suggestionOpen, setSuggestionOpen] = React.useState(false);
	const [suggestedFolks, setSuggestedFolks] = React.useState([]);
	const [pagination, setPagination] = React.useState<number>(5);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

	const [tweets, setTweets] = React.useState<Array<any>>([]);
	const [status, setStatus] = React.useState<Status>(Status.IDLE);
	const [hashtags, setHashtags] = React.useState<Array<string>>([]);
	const [metaData, setMetaData] = React.useState<MetaDataModel | null>(null);
	const [paginationStatus, setPaginationStatus] = React.useState<Status>(Status.IDLE);

	const debouncedSearchTerm = useDebounce(value, 500);

	React.useEffect(() => {
		// @ts-ignore
		if (metaData) console.log({ next_results: metaData.next_results });
	}, [metaData]);

	const onLoadMore = () => {
		// @ts-ignore
		if (!metaData.next_results) {
			console.log('scroll to top');
			return;
		}
		setPaginationStatus(Status.PENDING);
		// @ts-ignore
		searchTweets(metaData.next_results).then((results) => {
			const statuses = results.statuses.map((result: any) => result);
			setPaginationStatus(Status.RESOLVED);

			const hashtags: Array<string> = statuses
				.flatMap((result: any) => result.entities.hashtags)
				.map((hashtag: HashtagModel) => hashtag.text);
			// console.log(JSON.stringify(results, null, 4));

			setTweets((prevState) => [...prevState, ...statuses]);
			setMetaData(results.search_metadata);
			setHashtags((prevState) => [...prevState, ...hashtags]);
		});
	};

	const onFilteredSearch = (hashtag: string) => {
		setValue((prevState) => `${prevState} #${hashtag}`);
	};

	React.useEffect(() => {
		if (debouncedSearchTerm) {
			setStatus(Status.PENDING);
			searchTweets(`?q=${debouncedSearchTerm}&result_type=popular&count=5`).then((results) => {
				const statuses = results.statuses.map((result: any) => result);
				setStatus(Status.RESOLVED);
				// console.log(results, statuses);

				const hashtags: Array<string> = statuses
					.flatMap((result: any) => result.entities.hashtags)
					.map((hashtag: HashtagModel) => hashtag.text);
				// console.log(JSON.stringify(results, null, 4));

				setTweets(statuses);
				setMetaData(results.search_metadata);

				setHashtags(hashtags);
			});
		} else {
			setTweets([]);
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
						{hashtags.map((hashtag) => (
							<Hashtag {...{ hashtag }} />
						))}
					</div>
					<Feed {...{ tweets, status, onLoadMore, paginationStatus, metaData }} />
				</div>
				<div className="column is-hidden-mobile">
					<div className="box ">
						<h1 className="title is-4">Filter by hashtag</h1>
						<div className="is-flex-direction-row flex-wrap is-justify-content-start">
							{hashtags.map((hashtag) => (
								<Hashtag {...{ hashtag }} onHashtagPress={() => onFilteredSearch(hashtag)} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
