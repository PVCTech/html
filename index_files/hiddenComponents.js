function addHiddenComponent(type)
{
    switch(type)
    {
        case 'caption':
            appendCode(
                'htmlInput3',
`<div style="margin: 6px; font-size:18px; font-weight:bold; color:black;">
    H
</div>`
            );
            break;
    }
}
