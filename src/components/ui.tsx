import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components'


/*
 *
 *  Common
 *
 */

export const FlexContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: ${props => props.direction};
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
    width: ${props => props.width || '100%' };
    height: ${props => props.height || '100%' };
    padding: ${props => props.padding || '0' };
    margin: ${props => props.margin || '0' };
`;

export const FlexSeparator = styled.div`
    flex: 1 1 auto;
`;

export const Toolbar = styled.div`
    width: 100%;
    height: var(--rowHeight);
    min-height: var(--rowHeight);
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
`;

export const ToolbarSeparator = styled.div`
    width: 2px;
    height: 60%;
    margin: 0 5px;
    opacity: 0.6;
    background-color: var(--color);
`;

export const IconButton = styled.button`
    cursor: pointer;
    border: 0;
    background-color: transparent;
    opacity: 0.6;
    margin: 2.5px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        opacity: 1;
    }
`;

export const Input= styled.input.attrs(props => ({ type: 'text' }))`
    border: 0;
    font-size: 0.8rem;
    padding: 4px 8px;
    border-radius: 20px;
    color: var(--color);
    background-color: var(--bgColor);
    border: 1px solid transparent;

    :focus {
        outline: none;
        border: 1px solid var(--color);
    }
`;

export const Text = styled.div`
    font-size: ${props => props.fontSize || 1 }rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--color);
    width: ${props => props.width || 'inherit' };
    min-width: ${props => props.width || 'inherit' };
`;


/*
 *
 *  Modal
 *
 */

export const ModalContainer = styled.div`
    top: 0;
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    color: var(--color);
    transition: var(--modalTransition);
    display: flex;
    flex-direction: column;
    background-color: var(--bgColorPanel);
`;

export const ModalInner = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;


/*
 *
 *  Picture
 *
 */

export const PictureViewerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex-wrap: nowrap;
`;

export const PictureContainer = styled.div`
    max-width: 100%;
    justify-content: center;
    display: flex;
    align-items: center;
    height: calc(100% - 50px);
    min-height: calc(100% - 50px);
    max-height: calc(100% - 50px);
    width: 100%;
    padding: 20px;
`;

export const PictureCaptionContainer = styled.div`
    cursor: pointer;
    height: 50px;
    min-height: 50px;
    padding: 0 5px;
    display: flex;
    grid-area: caption;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
`;


/*
 *
 *  Cartel
 *
 */

export const CartelButton = styled.button`
    cursor: pointer;
    border: 0;
    background-color: transparent;
    opacity: 1;
    margin: 5px;
    padding: 5px 8px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border: 2px solid var(--color);
    border-radius: 5px;

    :hover {
        background-color: rgba(255, 255, 255, .1);
    }
`;

export const CartelRow = styled.div`
    font-size: 1em;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    padding: 1em;
    // margin-left: 3px;
    // margin-bottom: 10px;

    &.even {
        background-color: rgba(255, 255, 255, .1);
    }

    &.odd {

    }

    .label {
        width: 125px;
        min-width: 125px;
        font-size: 1rem;
    }
`;


/*
 *
 *  Historic
 *
 */

export const HistoricContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;

    img {
        cursor: pointer;
        width: 100%;
        height: 100%;
        min-width: 100px;
        min-height: 100px;
        max-width: 100px !important;
        max-height: 100px !important;
        object-fit: cover;
        margin: 10px;
        border: 4px solid transparent;
        background-color: rgba(255, 255, 255, .4);

        &:hover:not(.selected) {
            border: 4px solid rgba(0, 0, 0, .4);
        }

        &.selected {
            border: 4px solid red;
        }
    }
`;


/*
 *
 *  Sidebar
 *
 */

export const SidebarItemWrapper = styled.div`
    width: 100%;
    // height: ${props => props.height || '100%' };
    max-height: ${props => props.height || '100%' };
    overflow: hidden;
    transition: all ease .3s;
`;

export const SidebarItem = styled.div`
    user-select: none;
    cursor: pointer;
    height: 35px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
    opacity: ${props => props.opacity};
    padding-left: ${props => props.paddingLeft};

    :hover {
        background-color: var(--bgColorHover);
    }
`;

export const SidebarItemIcon = styled.div`
    margin: 0 15px 0 7.5px;
    height: 100%;
    display: flex;
    align-items: center;

    img {
        height: 20px;
        width: 20px;
    }
`;

export const SidebarItemHandle = styled(SidebarItemIcon)`
    cursor: grab;
`;

export const SidebarItemBtn = styled(SidebarItemIcon)`
    cursor: pointer;
    opacity: 0.6;
    height: 20px;
    width: 20px;
    margin: 0 7.5px 0 7.5px;

    &:hover {
        opacity: 1;
    }
`;


/*
 *
 *  Spinner
 *
 */

export const SpinnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
`;

export const SpinnerAnim = keyframes`
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1.0);
        opacity: 0;
    }
`;

export const SpinnerInner = styled.div`
    width: 40px;
    height: 40px;
    margin: 100px auto;
    background-color: var(--bgColorHover);
    border-radius: 100%;
    animation: ${SpinnerAnim} 1.0s infinite ease-in-out;
`;

export const Spinner: FC = () => (
    <SpinnerContainer>
        <SpinnerInner/>
    </SpinnerContainer>
);
