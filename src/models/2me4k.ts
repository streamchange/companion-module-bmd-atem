import { ModelSpec } from './types'
import { Enums } from 'atem-connection'

export const ModelSpecTwoME4K: ModelSpec = {
	id: Enums.Model.TwoME4K,
	label: '2 ME Production 4K',
	auxes: 6,
	MEs: 2,
	USKs: 2,
	DSKs: 2,
	MVs: 2,
	multiviewerFullGrid: false,
	SSrc: 1,
	macros: 100,
	media: {
		players: 2,
		stills: 32,
		clips: 2,
	},
	streaming: false,
	recording: false,
	recordISO: false,
	inputs: [
		{
			id: 0,
			portType: Enums.InternalPortType.Black,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 1,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 2,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 3,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 4,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 5,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 6,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 7,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 8,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 9,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 10,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 11,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 12,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 13,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 14,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 15,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 16,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 17,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 18,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 19,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 20,
			portType: Enums.InternalPortType.External,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 1000,
			portType: Enums.InternalPortType.ColorBars,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 2001,
			portType: Enums.InternalPortType.ColorGenerator,
			sourceAvailability:
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 2002,
			portType: Enums.InternalPortType.ColorGenerator,
			sourceAvailability:
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 3010,
			portType: Enums.InternalPortType.MediaPlayerFill,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 3011,
			portType: Enums.InternalPortType.MediaPlayerKey,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 3020,
			portType: Enums.InternalPortType.MediaPlayerFill,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 3021,
			portType: Enums.InternalPortType.MediaPlayerKey,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.SuperSourceArt |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 4010,
			portType: Enums.InternalPortType.Mask,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 4020,
			portType: Enums.InternalPortType.Mask,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 4030,
			portType: Enums.InternalPortType.Mask,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 4040,
			portType: Enums.InternalPortType.Mask,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 5010,
			portType: Enums.InternalPortType.Mask,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 5020,
			portType: Enums.InternalPortType.Mask,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 6000,
			portType: Enums.InternalPortType.SuperSource,
			sourceAvailability:
				Enums.SourceAvailability.KeySource |
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1 | Enums.MeAvailability.Me2,
		},
		{
			id: 7001,
			portType: Enums.InternalPortType.MEOutput,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 7002,
			portType: Enums.InternalPortType.MEOutput,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 8001,
			portType: Enums.InternalPortType.Auxiliary,
			sourceAvailability: Enums.SourceAvailability.Multiviewer,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 8002,
			portType: Enums.InternalPortType.Auxiliary,
			sourceAvailability: Enums.SourceAvailability.Multiviewer,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 8003,
			portType: Enums.InternalPortType.Auxiliary,
			sourceAvailability: Enums.SourceAvailability.Multiviewer,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 8004,
			portType: Enums.InternalPortType.Auxiliary,
			sourceAvailability: Enums.SourceAvailability.Multiviewer,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 8005,
			portType: Enums.InternalPortType.Auxiliary,
			sourceAvailability: Enums.SourceAvailability.Multiviewer,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 8006,
			portType: Enums.InternalPortType.Auxiliary,
			sourceAvailability: Enums.SourceAvailability.Multiviewer,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 10010,
			portType: Enums.InternalPortType.MEOutput,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 10011,
			portType: Enums.InternalPortType.MEOutput,
			sourceAvailability: Enums.SourceAvailability.Multiviewer | Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.None,
		},
		{
			id: 10020,
			portType: Enums.InternalPortType.MEOutput,
			sourceAvailability:
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1,
		},
		{
			id: 10021,
			portType: Enums.InternalPortType.MEOutput,
			sourceAvailability:
				Enums.SourceAvailability.SuperSourceBox |
				Enums.SourceAvailability.Multiviewer |
				Enums.SourceAvailability.Auxiliary,
			meAvailability: Enums.MeAvailability.Me1,
		},
	],
	classicAudio: {
		inputs: [
			{
				id: 1,
				portType: 1,
			},
			{
				id: 2,
				portType: 1,
			},
			{
				id: 3,
				portType: 1,
			},
			{
				id: 4,
				portType: 1,
			},
			{
				id: 5,
				portType: 1,
			},
			{
				id: 6,
				portType: 1,
			},
			{
				id: 7,
				portType: 1,
			},
			{
				id: 8,
				portType: 1,
			},
			{
				id: 9,
				portType: 1,
			},
			{
				id: 10,
				portType: 1,
			},
			{
				id: 11,
				portType: 1,
			},
			{
				id: 12,
				portType: 1,
			},
			{
				id: 13,
				portType: 1,
			},
			{
				id: 14,
				portType: 1,
			},
			{
				id: 15,
				portType: 1,
			},
			{
				id: 16,
				portType: 1,
			},
			{
				id: 17,
				portType: 1,
			},
			{
				id: 18,
				portType: 1,
			},
			{
				id: 19,
				portType: 1,
			},
			{
				id: 20,
				portType: 1,
			},
			{
				id: 1001,
				portType: 32,
			},
			{
				id: 1201,
				portType: 128,
			},
			{
				id: 2001,
				portType: 256,
			},
			{
				id: 2002,
				portType: 256,
			},
		],
	},
}