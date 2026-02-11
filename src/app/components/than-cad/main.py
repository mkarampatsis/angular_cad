from pyscript import when, display

@when("click", "#my-button")
def handler():
    display("Button clicked!")