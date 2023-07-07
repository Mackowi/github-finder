import axios from 'axios'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseUrl: GITHUB_URL,
  // headers: { Authorization: `token ${GITHUB_TOKEN}` },
})

// get initial users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`/search/users?${params}`)

  // const response = await fetch(`${GITHUB_URL}/search/users?${params}`)
  // const { items } = await response.json()

  return response.data.items
}

// get user and repos

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}

// OLD
//  get user repos
// export const getUserRepos = async (login) => {
//   const params = new URLSearchParams({
//     sort: 'created',
//     per_page: 10,
//   })

//   const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)
//   const data = await response.json()

//   return data
// }

//  get single user
// export const getUser = async (login) => {
//   const response = await fetch(`${GITHUB_URL}/users/${login}`)

//   if (response.status === 404) {
//     window.location = '/notfound'
//   } else {
//     const data = await response.json()

//     return data
//   }
// }
