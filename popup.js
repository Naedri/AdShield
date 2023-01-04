document
  .getElementById("triggerBlock")
  .addEventListener("click", async function () {
    await chrome.runtime.sendMessage(
      { toggleAdBlocking: "toggle" },
      (result) => {
        console.log(JSON.stringify(result));
        document.getElementById("triggerState").innerHTML = result.state
          ? "Activated"
          : "Deactivated";
      }
    );
  });
