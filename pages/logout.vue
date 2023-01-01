<script setup lang="ts">
const { status, data, signIn, signOut } = useSession()
await signIn() // Sign in the user
</script>
