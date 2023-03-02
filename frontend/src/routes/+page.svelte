<script>
	import { goto } from "$app/navigation";
	import { redirect } from "@sveltejs/kit";

	let name = 'world';

    // form: 
    import Form from "./Form.svelte"
	
    // TODO: handleOnSubmit, pass name through to backend
	function handleOnSubmit() {
        throw redirect(302, '/mycalendar');
		console.log("Smbmitted");
        // goto(`/days`);
        // throw redirect(307, '/days');
	}
</script>

<!-- <input value={name}> -->

<!-- <h2>Hello {name}!</h2> -->

<head>
    <style>
        h1 {
            text-align: center;
        }
    </style>
</head>

<h1>Welcome to our scheduling app!</h1>
<h2>Please enter your name to begin: </h2>

<Form on:submit={handleOnSubmit}>
</Form>