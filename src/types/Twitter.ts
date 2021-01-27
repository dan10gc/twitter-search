export interface HashtagModel {
    text: string;
    indices: Array<number>;
}

export interface MetaDataModel {
    completed_in: number;
    count: number;
    max_id: number;
    max_id_str: string;
    // is not returned when user reaches end of list
    next_results?: string;
    query: string
    since_id: number
    since_id_str: string
}