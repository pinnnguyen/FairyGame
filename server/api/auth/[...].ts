import CredentialsProvider from 'next-auth/providers/credentials'
// import GithubProvider from 'next-auth/providers/github'
// import FacebookProvider from 'next-auth/providers/facebook'
import { NuxtAuthHandler } from '#auth'
import { UserSchema } from '~/server/schema/user'

export default NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: 'kkfo2i1o2n2nfjjk2k22k2e2ejf',
  providers: [
    //    GithubProvider.default({
    //      clientId: process.env.GITHUB_CLIENT_ID,
    //      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //    }),
    // FacebookProvider.de
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const findUser = await UserSchema.findOne({
          email: credentials?.username,
          password: credentials?.password,
        })

        if (findUser)
          return findUser

        else
          return null
      },
    }),
  ],
})
