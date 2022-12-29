<script setup lang="ts">
const { status, data, signIn, signOut } = useSession()
console.log('status', status.value)
await signIn() // Sign in the user
</script>
