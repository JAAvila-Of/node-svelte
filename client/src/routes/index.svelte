<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import List from "../pages/list.svelte";
  import Home from "../pages/home.svelte";
</script>

<Router>
  <header class=" bg-purple-800 h-11 sticky top-0 z-50 shadow-md">
    <div class="w-9/12 mx-auto text-white ">
      <nav class="flex justify-center space-x-4 text-xl ">
        <Link to="/">
          <button class="border-none mt-1"> Home </button>
        </Link>
        <Link to="/list/1">
          <button class="border-none mt-1"> List </button>
        </Link>
      </nav>
    </div>
  </header>

  <Route path="/" let:params>
    <Home />
  </Route>
  <Route path="/list/:p" let:params>
    <List page={params.p} />
  </Route>
</Router>
