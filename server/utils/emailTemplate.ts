export const emailTemplate = (
    header: string,
    content: string,
    buttontText: string,
    href: string
) => `
    <table
        cellpadding="20"
        cellspacing="0"
        align="center"
        border="0"
        style="width: 100%; background: #ffff00; padding: 15px;"
    >   
        <tr>
            <td align="center">
            <h1
                style="
                    margin: 0px;
                    font-size: 16px;
                    color: black;
                    text-transform: uppercase;
                    font-weight: 600;
                    font-family: cursive;
                    letter-spacing: 1px;
                "
            >
                ${header}
            </h1>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-top: 10px;">
            <p
                style="
                    margin: 0px;
                    font-size: 15px;
                    color: black;
                    font-family: cursive;
                    letter-spacing: 1px;
                "
            >
                ${content}
            </p>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-top: 10px; padding-bottom: 15px;">
            <a
                href=${href}
                style="
                    width: 180px;
                    display: block;
                    padding: 18px;
                    color: black;
                    background: none;
                    border: 2px solid black;
                    border-radius: 10px;
                    font-family: cursive;
                    letter-spacing: 1px;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                "
            >
                ${buttontText}
            </a>
            </td>
        </tr>
    </table>
`
