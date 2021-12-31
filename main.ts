interface Post {
    id: number;
    description: string;
    image: string;
    created_at: number
}





/**
 * @Sample @input -> [[{id: 3, description: "today is 31st Dec 2021", image: "http://www.src.png", created_at: 31122021}, {id: 3, description: "today is 31st Dec 2021", image: "http://www.src.png", created_at: 31122021}, {id: 3, description: "today is 31st Dec 2021", image: "http://www.src.png", created_at: 31122021}, {id: 3, description: "today is 31st Dec 2021", image: "http://www.src.png", created_at: 31122021}]]
 * @Typescript
 * @returns Post[]
 */
export const merge_posts = (lists_of_post: Post[][]): Post[] => {

    /*
        initialize global variables
    */
    let post_list: Post[] = []; // the post array to be returned
    let memo: any = {}; // induces the memoization technique
    let temp: Post = {
        id: 0,
        description: "",
        image: "",
        created_at: 0
    }; // acts as a placeholder for sorting the items 

    /*
        now loop through the 2d array using two for loops 
        then populate the post_list with each post item
        making sure there are no duplicate post id asumming they are same if so
    */

    for (const posts of lists_of_post) {
        for (const post of posts) {
            // check if it's a duplicate
            if (memo[post.id] != null) {
                continue
            }
            else {
                post_list.push(post);

                // cache the already seen post id so it exclude duplicate
                memo[post.id] = post.id;
            }
        }
    }

    /*
        now sort the array by the created_at attribute in a descending order
        for each post item where the created_at attribute are same -> sort them based on their ids in a descending order
    */

    for (let i = 0; i < post_list.length; i++) {
        for (let j = i + 1; j < post_list.length; j++) {
            // sorting the post item in a descending order based on the post created_at
            if (post_list[i].created_at < post_list[j].created_at) {
                temp = post_list[i]
                post_list[i] = post_list[j]
                post_list[j] = temp
            }
            // sorting the post item in a descending order based on the post id
            else if (post_list[i].created_at == post_list[j].created_at) {
                if (post_list[i].id < post_list[j].id) {
                    temp = post_list[i]
                    post_list[i] = post_list[j]
                    post_list[j] = temp
                }
            }
        }
    }

    return post_list // return the post 1d array
}


