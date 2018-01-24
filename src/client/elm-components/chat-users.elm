module ChatUsers exposing (main)

import Debug exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode exposing (int, string, float, nullable, Decoder)
import Json.Decode.Pipeline exposing (decode, required, optional, hardcoded)
import Regex exposing (..)
import Array exposing (get)
import WebSocket


main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    WebSocket.listen model.server NewLogin



-- MODEL


type alias Model =
    { server : String
    , users : List String
    }


init : ( Model, Cmd Msg )
init =
    ( Model "ws://localhost:3000/socket.io/?EIO=3&transport=websocket" [], Cmd.none )



-- UPDATE


type alias Login =
    { username : String
    }


type Msg
    = NewLogin String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg ({ server, users } as model) =
    case msg of
        NewLogin newLogin ->
            case decodeLogin newLogin of
                Nothing ->
                    ( model, Cmd.none )

                Just login ->
                    ( { model | users = login.username :: users }, Cmd.none )


decodeLogin : String -> Maybe Login
decodeLogin raw =
    let
        x =
            parseSocketIOMessage raw

        res =
            Json.Decode.decodeString
                loginDecoder
                x
    in
        case res of
            Result.Err err ->
                Nothing

            Result.Ok v ->
                Just v



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "chat-container" ]
        [ div [ class "chat-users", usersStyle ] (List.map viewUser (List.reverse model.users))
        ]


viewUser : String -> Html msg
viewUser usr =
    div [] [ text usr ]


usersStyle =
    style
        [ ( "padding", "15px" )
        , ( "font-size", "1em" )
        , ( "border-style:", "solid" )
        ]


loginDecoder : Decoder Login
loginDecoder =
    decode Login
        |> Json.Decode.Pipeline.required "username" string



-- Parse socket.io protocol messages (dirty hack)


repl =
    replace All (regex "[123456789\\[\\]]") (\_ -> "")


parseSocketIOMessage : String -> String
parseSocketIOMessage str =
    let
        raw =
            repl str

        spl =
            Array.fromList (String.split "," raw)
    in
        case get 1 spl of
            Nothing ->
                ""

            Just v ->
                v
