import { JSX, PropsWithChildren, ReactElement } from "react"
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from "react-redux";

import { AppStore, setupStore } from "./setupStore";
import { RootState } from '../../src/app/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'>
{
    preloadedState?: Partial<RootState>
    store?: AppStore
}

/**
 * Custom render
 * @param ui
 * @param wrapper option
 * @returns data provider
 */
export function renderWithProviders(
    ui: ReactElement,
    {
        store = setupStore(),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }
return { store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}