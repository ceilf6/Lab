import withLog from "./withLog"
import withLogin from "./withLogin"

export default function allApp(Comp, modifier = 'ceilf6') {
    return withLogin(withLog(Comp), modifier)
}