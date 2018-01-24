port module ChatInput exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import WebSocket


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }



-- port for sending messages out to JavaScript


port message : String -> Cmd msg



-- MODEL


type alias Model =
    { input : String
    }


init : ( Model, Cmd Msg )
init =
    ( Model "", Cmd.none )



-- UPDATE


type Msg
    = Input String
    | Send


update : Msg -> Model -> ( Model, Cmd Msg )
update msg { input } =
    case msg of
        Input v ->
            ( Model v, Cmd.none )

        Send ->
            ( Model "", message input )



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ input [ onInput Input, placeholder "Your message", value model.input ] []
        , button [ onClick Send ] [ text "Send" ]
        ]
